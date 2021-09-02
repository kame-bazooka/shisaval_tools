/**
 * @module ActionFlagStyle
 * @author kame-bazooka
 * @license MIT License
 */
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

/**
 * {@link Flag} コンポーネントのAction!!フラッグを表すスタイルシートです。
 */
export const ActionFlagStyle = makeStyles((p_theme: Theme) =>
  createStyles({
    root: {
      border: `1px solid #60BED9`,
      borderLeft: `10px solid #0171D2`,
      backgroundColor: "#1F90E4",
      color: "#D6E8F9",
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
 * {@link Flag} コンポーネントのAction!!フラッグを表すスタイルシートです。
 *
 * クリック可能なバージョンに使います。
 */
export const ActionFlagClickableStyle = makeStyles((p_theme: Theme) =>
  createStyles({
    root: {
      border: `1px solid #60BED9`,
      borderLeft: `10px solid #0171D2`,
      backgroundColor: "#1F90E4",
      color: "#D6E8F9",
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
