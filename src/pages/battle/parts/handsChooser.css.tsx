/**
 * @module HandsChooserStyle
 * @author kame-bazooka
 * @license MIT License
 */
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

/**
 * {@link HandsChooser} コンポーネントのスタイルシートを定義します。
 */
export const HandsChooserStyle = makeStyles((p_theme: Theme) =>
  createStyles({
    root: {
      marginTop: 20,
      marginBottom: 20,
    },
    selector: {
      textAlign: "center",
      padding: 5
    }
  })
);
