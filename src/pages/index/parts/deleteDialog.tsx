/**
 * @module DeleteDialog
 * @author kame-bazooka
 * @license MIT License
 */
import React from "react";

import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react";
import { Button, Divider, Flex } from "@chakra-ui/react";

import StorageManager from "../../../models/storageManager";
import { DAYS_LABEL, getRangeArray } from "../../../models/utils";

/**
 * {@link DeleteDialog}コンポーネントのプロパティです。
 */
export interface DeleteDialogProps {
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
 * 設定情報削除用ダイアログです。
 *
 * @param props {@link DeleteDialogProps}型のプロパティ
 * @returns 設定情報表示ダイアログ
 */
export default function DeleteDialog(props: DeleteDialogProps): JSX.Element {
  /**
   * メモクリアボタンを押した時のイベントハンドラ
   */
  const onMemoClear = () => {
    const vIsOk = window.confirm(
      "ターンメモ含め、全ての曜日のすべてのメモと花丸を消します。\r\n\r\n本当によろしいですか？"
    );
    if (vIsOk) {
      DAYS_LABEL.forEach((_, p_day_idx) => {
        StorageManager.deleteDayStrategyMemo(p_day_idx);
        getRangeArray(10).forEach((p_turn_idx) => {
          StorageManager.deleteDayTurnStrategyMemo(p_day_idx, p_turn_idx + 1);
        });
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

  // コンポーネント作って返す
  return (
    <Modal onClose={props.onDialogClose} isOpen={props.isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>設定情報の削除</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex flexDirection="column">
            <Button onClick={onMemoClear}>すべての曜日のメモを全部消す</Button>
            <Divider mt={5} />
            <Button onClick={onFlagClear}>すべての曜日のフラッグ情報を全部消す</Button>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={props.onDialogClose}>閉じる</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
