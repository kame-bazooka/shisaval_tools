/**
 * @module Header
 * @author kame-bazooka
 * @license MIT License
 */
import React from "react";

import { Flex, Spacer, Text, IconButton, Switch, Box, useColorMode, useColorModeValue  } from "@chakra-ui/react";
import { QuestionIcon, SettingsIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";

import SettingDialog from "./settingDialog";

/**
* 全ページの上に出てるヘッダを表すコンポーネントです。
*
* @returns ヘッダコンポーネント
*/
export default function Header(): JSX.Element {
  /**
  * 設定ダイアログを表示するか。trueなら表示されます。
  */
  const [FSettingDialogOpen, setSettingDialogOpen] = React.useState(false);

  const HeaderStyle = {
    backgroundColor: useColorModeValue("#3F51B5", "gray.900"),
    color: useColorModeValue("white", "white")
  }

  /**
   * ダークモードの切り替え
   */
  const { colorMode, toggleColorMode } = useColorMode();

  /**
  * ヘルプボタンを押すと呼ばれるイベントハンドラ
  */
  const onHelpOpen = () => {
    window.open("help.htm");
  }

  /**
  * 設定ボタンを押すと呼ばれるイベントハンドラ
  */
  const onSettingDialogOpen = () => {
    setSettingDialogOpen(true);
  }

  /**
   * 設定ダイアログを閉じる必要がある時に呼ばれるイベントハンドラ
   */
  const onSettingDialogClose = () => {
    setSettingDialogOpen(false);
  }

  // コンポーネント作って返す
  return (
    <>
      <Flex p={2} {...HeaderStyle}>
        <Text fontSize="lg" display="flex" alignItems="center" ml={2}>シーサーバル道場支援ツール</Text>
        <Spacer />
        <Box display="flex" alignItems="center" marginRight={2}>
          { colorMode === "light" ? <SunIcon /> : <MoonIcon /> }
        </Box>
        <Switch colorScheme="red" display="flex" alignItems="center" marginRight={4} onChange={toggleColorMode} isChecked={colorMode === "dark"} />
        <IconButton display="flex" aria-label="設定" icon={<SettingsIcon />} alignItems="center" variant="outline" marginRight={2} onClick={onSettingDialogOpen} />
        <IconButton display="flex" aria-label="ヘルプ" icon={<QuestionIcon />} alignItems="center" variant="outline" onClick={onHelpOpen} />
      </Flex>
      <SettingDialog isOpen={FSettingDialogOpen} onDialogClose={onSettingDialogClose} />
    </>
  );
}
