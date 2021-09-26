/**
 * @module Header
 * @author kame-bazooka
 * @license MIT License
 */
import React from "react";

import { HeaderStyle } from "./header.css";

import { AppBar, IconButton, Toolbar, Typography } from "@material-ui/core";
import HelpOutline from "@material-ui/icons/HelpOutline";
import DeleteIcon from "@material-ui/icons/Delete";

import DeleteDialog from "./deleteDialog";

/**
 * 全ページの上に出てるヘッダを表すコンポーネントです。
 *
 * @returns ヘッダコンポーネント
 */
export default function Header(): JSX.Element {
  /**
   * スタイルシート
   */
  const styleSheet = HeaderStyle();

  /**
   * 削除ダイアログを表示するか。trueなら表示されます。
   */
  const [FDeleteDialogOpen, setDeleteDialogOpen] = React.useState(false);

  /**
   * ヘルプボタンを押すと呼ばれるイベントハンドラ
   */
  const onHelpOpen = () => {
    window.open("help.htm");
  }

  /**
   * 削除ボタンを押すと呼ばれるイベントハンドラ
   */
  const onDeleteDialogOpen = () => {
    setDeleteDialogOpen(true);
  }

  /**
   * 削除ダイアログを閉じる必要がある時に呼ばれるイベントハンドラ
   */
  const onDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
  }

  // コンポーネント作って返す
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography>シーサーバル道場支援ツール</Typography>
          <div className={styleSheet.grow} />
          <div>
          <IconButton edge="start" color="inherit" className={styleSheet.imageButton} onClick={onDeleteDialogOpen}>
            <DeleteIcon />
          </IconButton>
          <IconButton edge="start" color="inherit" className={styleSheet.imageButton} onClick={onHelpOpen}>
            <HelpOutline />
          </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <DeleteDialog isOpen={FDeleteDialogOpen} onDialogClose={onDeleteDialogClose} />
    </div>
  );
}
