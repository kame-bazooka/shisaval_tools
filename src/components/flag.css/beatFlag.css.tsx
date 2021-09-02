/**
 * @module BeatFlagStyle
 * @author kame-bazooka
 * @license MIT License
 */
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

/**
 * {@link Flag} コンポーネントのBeat!!!フラッグを表すスタイルシートです。
 */
export const BeatFlagStyle = makeStyles((p_theme: Theme) =>
  createStyles({
    root: {
      border: `1px solid #C4B064`,
      borderLeft: `10px solid #FE4004`,
      backgroundColor: "#FA7236",
      color: "#FFECEE",
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
export const BeatFlagClickableStyle = makeStyles((p_theme: Theme) =>
  createStyles({
    root: {
      border: `1px solid #C4B064`,
      borderLeft: `10px solid #FE4004`,
      backgroundColor: "#FA7236",
      color: "#FFECEE",
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
