/**
 * @module WeeklyTabsStyle
 * @author kame-bazooka
 * @license MIT License
 */
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

/**
 * {@link WeeklyTabs} コンポーネントのスタイルシートを定義します。
 */
export const WeeklyTabsStyle = makeStyles((p_theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      border: `1px solid ${p_theme.palette.divider}`,
      display: "flex", // 縦型タブにするのに必須
      height: 480
    },
    tabs: {
      borderRight: `1px solid ${p_theme.palette.divider}`,
      minWidth: 180,
      maxWidth: 180
    }
  })
);
