/**
 * @module HelpDialog
 * @author kame-bazooka
 * @license MIT License
 */
import React from "react";

import Dialog from "@material-ui/core/Dialog";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import ReactMarkdown from "react-markdown";

/**
 * {@link HelpDialog}コンポーネントのプロパティです。
 */
export interface HelpDialogProps {
  /**
   * ヘルプファイルとして表示するMarkdown文字列です。
   */
  helpMarkdown: string;

  /**
   * ダイアログを表示するかを決めます。trueなら表示され、falseなら消えます。
   */
  isOpen: boolean;

  /**
   * ヘルプダイアログを閉じる必要がある時に呼ばれるイベントハンドラ
   */
  onDialogClose: () => void;
}

/**
 * ヘルプ表示用のダイアログです。
 *
 * @param props {@link HelpDialogProps}型のプロパティ
 * @returns ヘルプダイアログ
 */
export default function HelpDialog(props: HelpDialogProps): JSX.Element {
  // コンポーネント作って返す
  return (
    <Dialog onClose={props.onDialogClose} open={props.isOpen} aria-labelledby="customized-dialog-title" maxWidth={"lg"}>
      <MuiDialogContent dividers>
        <Typography gutterBottom>
          <ReactMarkdown linkTarget={"_blank"}>
            {props.helpMarkdown}
          </ReactMarkdown>
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
