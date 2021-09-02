/**
 * @module FlagChorusViewStyle
 * @author kame-bazooka
 * @license MIT License
 */
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

/**
 * {@link FlagChorusView} コンポーネントのスタイルシートを定義します。
 */
export const FlagChorusViewStyle = makeStyles((p_theme: Theme) =>
  createStyles({
    root: {
      border: `2px solid ${p_theme.palette.divider}`,
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
