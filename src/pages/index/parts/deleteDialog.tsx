/**
 * @module DeleteDialog
 * @author kame-bazooka
 * @license MIT License
 */
import React from "react";

import Dialog from "@material-ui/core/Dialog";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

import StorageManager from "../../../models/storageManager";
import {DAYS_LABEL, getRangeArray} from "../../../models/utils";

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
      "ターンメモ含め、全ての曜日のすべてのメモを消します。\r\n\r\n本当によろしいですか？"
    );
    if (vIsOk) {
      DAYS_LABEL.forEach((_, p_day_idx) => {
        StorageManager.deleteDayStrategyMemo(p_day_idx);
        getRangeArray(10).forEach((p_turn_idx) => {
          StorageManager.deleteDayTurnStrategyMemo(p_day_idx, p_turn_idx + 1);
        });
      })

      location.reload();
    }
  }
  
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
      })

      location.reload();
    }
  }

  // コンポーネント作って返す
  return (
    <Dialog onClose={props.onDialogClose} open={props.isOpen} aria-labelledby="customized-dialog-title">
      <MuiDialogContent dividers>
        <div>
          <Button variant="contained" fullWidth={true} onClick={onMemoClear}>すべての曜日のメモを全部消す</Button>
        </div>
        <hr />
        <div>
          <Button variant="contained" fullWidth={true} onClick={onFlagClear}>すべての曜日のフラッグ情報を全部消す</Button>
        </div>
      </MuiDialogContent>
      <MuiDialogActions>
        <Button onClick={props.onDialogClose} color="primary">
          閉じる
        </Button>
      </MuiDialogActions>
    </Dialog>
  );
}
