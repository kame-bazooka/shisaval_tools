/**
 * @module HeaderStyle
 * @author kame-bazooka
 * @license MIT License
 */
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

/**
 * {@link Header} コンポーネントのスタイルシートを定義します。
 */
export const HeaderStyle = makeStyles((p_theme: Theme) =>
  createStyles({
    imageButton: {
      marginLeft: "auto"
    },
    grow: {
      flexGrow: 1,
    }
  })
);
