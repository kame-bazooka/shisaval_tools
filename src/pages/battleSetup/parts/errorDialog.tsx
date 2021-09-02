/**
 * @module ErrorDialog
 * @author kame-bazooka
 * @license MIT License
 */
import React from "react";

import Dialog from "@material-ui/core/Dialog";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

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
    <Dialog onClose={props.onDialogClose} open={props.isOpen} aria-labelledby="customized-dialog-title">
      <MuiDialogContent dividers>
        <Typography gutterBottom>
          {props.dialogMessage}
        </Typography>
      </MuiDialogContent>
      <MuiDialogActions>
        <Button autoFocus onClick={props.onDialogClose} color="primary">
          閉じる
        </Button>
      </MuiDialogActions>
    </Dialog>
  );
}
