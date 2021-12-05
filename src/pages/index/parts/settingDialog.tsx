/**
 * @module DeleteDialog
 * @author kame-bazooka
 * @license MIT License
 */
import React from "react";

import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react";
import { Button, Divider, Flex, Heading } from "@chakra-ui/react";

import StorageManager from "../../../models/storageManager";
import { DAYS_LABEL } from "../../../models/utils";

/**
 * {@link SettingDialog}コンポーネントのプロパティです。
 */
export interface SettingDialogProps {
  /**
   * ダイアログを表示するかを決めます。trueなら表示され、falseなら消えます。
   */
  isOpen: boolean;

  /**
   * ダイアログを閉じる必要がある時に呼ばれるイベントハンドラ
   */
  onDialogClose: () => void;
}

/**
 * 設定情報ダイアログです。
 *
 * @param props {@link SettingDialogProps}型のプロパティ
 * @returns 設定情報表示ダイアログ
 */
export default function SettingDialog(props: SettingDialogProps): JSX.Element {
  /**
   * ファイルコントロールのDOM要素
   */
  const FFileInput = React.useRef<HTMLInputElement>(null);

  /**
   * ファイルダウンロード用アンカーのDOM要素
   */
  const FFileDownloadAnchor = React.useRef<HTMLAnchorElement>(null);

  /**
   * メモクリアボタンを押した時のイベントハンドラ
   */
  const onMemoClear = () => {
    const vIsOk = window.confirm(
      "全ての曜日のすべてのメモと花丸を消します。\r\n\r\n本当によろしいですか？"
    );
    if (vIsOk) {
      DAYS_LABEL.forEach((_, p_day_idx) => {
        StorageManager.deleteDayStrategyMemo(p_day_idx);
        StorageManager.deleteDayWhiteFlower(p_day_idx);
        StorageManager.deleteDayMemoHeight(p_day_idx);
      });

      location.reload();
    }
  };

  /**
   * フラッグ初期化ボタンを押した時のイベントハンドラ
   */
  const onFlagClear = () => {
    const vIsOk = window.confirm(
      "すべての曜日のフラッグ数を初期化します。\r\n\r\n本当によろしいですか？"
    );
    if (vIsOk) {
      DAYS_LABEL.forEach((_, p_day_idx) => {
        StorageManager.deleteDayFlag(p_day_idx);
      });

      location.reload();
    }
  };

  /**
   * ファイルコントロールでファイルが選択されると飛んでくるハンドラ
   */
  const onExecuteImport = (p_event: React.ChangeEvent<HTMLInputElement>) => {
    if (p_event.target.files) {
      const vReader = new FileReader();
      vReader.addEventListener("load", p_file_text => {
        if (p_file_text.target && p_file_text.target.result) {
          StorageManager.loadSettingJSON(p_file_text.target.result as string);
          location.reload();
        }
      });
      vReader.readAsText(p_event.target.files[0]);
    }
  };

  /**
   * エクスポートボタンを押したときのイベントハンドラ
   */
  const onExportButtonClick = () => {
    if (FFileDownloadAnchor.current) {
      // ファイルを取得して
      const vDownloadFile = new Blob([ StorageManager.getSettingJSON() ], { "type" : "text/plain" });

      // ダウンロードさせる
      FFileDownloadAnchor.current.href = window.URL.createObjectURL(vDownloadFile);
      FFileDownloadAnchor.current.click();
    }
  };

  /**
   * インポートボタンを押したときのイベントハンドラ
   */
  const onImportButtonClick = () => {
    alert("特に中身の整合性は見ないので、自分で保存したファイルだけを読み込んでください。");
    if (FFileInput.current) {
      FFileInput.current.click();
    }
  };

  // コンポーネント作って返す
  return (
    <Modal onClose={props.onDialogClose} isOpen={props.isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>設定</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex flexDirection="column">
            <Heading size="md">保存と読み込み</Heading>
            <Button mt={3} onClick={onExportButtonClick}>設定を保存</Button>
            <a download="shisaval_tools.json" ref={FFileDownloadAnchor} />
            <Button mt={3} onClick={onImportButtonClick}>設定を読み込み</Button>
            <input type="file" accept=".json" ref={FFileInput} style={{ display: "none" }} onChange={onExecuteImport} />
            <Divider mt={3} mb={3} />
            <Heading size="md">削除</Heading>
            <Button mt={3} onClick={onMemoClear}>すべての曜日のメモを全部消す</Button>
            <Button mt={3} onClick={onFlagClear}>すべての曜日のフラッグ情報を全部消す</Button>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={props.onDialogClose}>閉じる</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
