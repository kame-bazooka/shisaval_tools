/**
 * @module BattleStyle
 * @author kame-bazooka
 * @license MIT License
 */
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

/**
 * {@link Battle} コンポーネントのスタイルシートを定義します。
 */
export const BattleStyle = makeStyles((p_theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      minWidth: 1100,
      border: `1px solid ${p_theme.palette.divider}`,
    },
    predictionFlagCard: {
      minWidth: 360,
      maxWidth: 360,
      marginLeft: "auto"
    },
    turnMemoCard: {
      minWidth: 360,
      maxWidth: 360,
      marginTop: 10,
      marginLeft: "auto"
    },
    enemyPunchCounterCard: {
      minWidth: 360,
      maxWidth: 360,
      marginTop: 10,
      marginLeft: "auto"
    },
    orderChangeButton: {
      marginTop: 10
    },
    accordionRoot: {
      width: "100%"
    },
    accordionGrid: {
      width: "100%"
    }
  })
);
