/**
 * @module OrderChangeStyle
 * @author kame-bazooka
 * @license MIT License
 */
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

/**
 * {@link OrderChange} コンポーネントのスタイルシートを定義します。
 */
export const OrderChangeStyle = makeStyles((p_theme: Theme) =>
  createStyles({
    root: {
      minWidth: 1024
    },
    predictionFlagCard: {
      minWidth: 360,
      maxWidth: 360,
      marginLeft: "auto"
    }
  })
);
