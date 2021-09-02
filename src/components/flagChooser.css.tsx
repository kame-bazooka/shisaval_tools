/**
 * @module FlagChooserStyle
 * @author kame-bazooka
 * @license MIT License
 */
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

/**
 * {@link FlagChooser} コンポーネントのスタイルシートを定義します。
 */
export const FlagChooserStyle = makeStyles((p_theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      width: "310px",
      marginLeft: "auto",
      marginRight: "auto",
      paddingLeft: "10px",
      paddingRight: "10px"
    },
    highlight: {
      border: `2px solid blue`
    }
  })
);
