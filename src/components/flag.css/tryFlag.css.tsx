/**
 * @module TryFlagStyle
 * @author kame-bazooka
 * @license MIT License
 */
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

/**
 * {@link Flag} コンポーネントのTry!!フラッグを表すスタイルシートです。
 */
export const TryFlagStyle = makeStyles((p_theme: Theme) =>
  createStyles({
    root: {
      border: `1px solid #BCF27F`,
      borderLeft: `10px solid #129D07`,
      backgroundColor: "#59CC3A",
      color: "#EBF8E4",
      marginTop: "5px",
      marginBottom: "5px",
      marginLeft: "auto",
      marginRight: "auto",
      paddingLeft: "10px",
      width: "70px",
      userSelect: "none"
    }
  })
);

/**
 * {@link Flag} コンポーネントのBeat!!!フラッグを表すスタイルシートです。
 *
 * クリック可能なバージョンに使います。
 */
export const TryFlagClickableStyle = makeStyles((p_theme: Theme) =>
  createStyles({
    root: {
      border: `1px solid #BCF27F`,
      borderLeft: `10px solid #129D07`,
      backgroundColor: "#59CC3A",
      color: "#EBF8E4",
      marginTop: "5px",
      marginBottom: "5px",
      marginLeft: "auto",
      marginRight: "auto",
      paddingLeft: "10px",
      width: "70px",
      userSelect: "none",
      cursor: "pointer"
    }
  })
);
