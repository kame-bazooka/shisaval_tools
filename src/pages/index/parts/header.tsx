/**
 * @module Header
 * @author kame-bazooka
 * @license MIT License
 */
import React from "react";

import { Flex, Spacer, Box, Text, IconButton  } from "@chakra-ui/react";
import { QuestionIcon, DeleteIcon } from "@chakra-ui/icons";

import DeleteDialog from "./deleteDialog";

/**
* 全ページの上に出てるヘッダを表すコンポーネントです。
*
* @returns ヘッダコンポーネント
*/
export default function Header(): JSX.Element {
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
    <>
      <Flex color="white" bg="blue.600" p={2}>
        <Box>
          <Text fontSize="lg" lineHeight="2em">シーサーバル道場支援ツール</Text>
        </Box>
        <Spacer />
        <IconButton aria-label="設定の削除" icon={<DeleteIcon />} verticalAlign="middle" variant="outline" marginRight={2} onClick={onDeleteDialogOpen} />
        <IconButton aria-label="ヘルプ" icon={<QuestionIcon />} verticalAlign="middle" variant="outline" onClick={onHelpOpen} />
      </Flex>
      <DeleteDialog isOpen={FDeleteDialogOpen} onDialogClose={onDeleteDialogClose} />
    </>
  );
}
