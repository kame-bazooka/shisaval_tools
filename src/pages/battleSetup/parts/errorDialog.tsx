/**
 * @module ErrorDialog
 * @author kame-bazooka
 * @license MIT License
 */
import React from "react";

import { Modal, ModalOverlay, ModalContent, ModalFooter, ModalBody } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";

/**
* {@link ErrorDialog}コンポーネントのプロパティです。
*/
export interface ErrorDialogProps {
  /**
  * エラーメッセージ
  */
  dialogMessage: string;

  /**
  * エラーダイアログを表示するかどうか。trueなら表示する。
  */
  isOpen: boolean;

  /**
  * ダイアログを閉じる必要がある時に呼ばれるイベントハンドラ。
  */
  onDialogClose: () => void;
}

/**
* エラー表示用のダイアログです。
* メッセージがあると表示され、無くなると消えます。
*
* @param props {@link ErrorDialogProps}型のプロパティ
* @returns エラーダイアログコンポーネント
*/
export default function ErrorDialog(props: ErrorDialogProps): JSX.Element {
  // コンポーネント作って返す
  return (
    <Modal onClose={props.onDialogClose} isOpen={props.isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          {props.dialogMessage}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={props.onDialogClose}>閉じる</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
