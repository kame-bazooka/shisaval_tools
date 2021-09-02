/**
 * @module BattleSetupStyle
 * @author kame-bazooka
 * @license MIT License
 */
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

/**
 * {@link BattleSetup} コンポーネントのスタイルシートを定義します。
 */
export const BattleSetupStyle = makeStyles((p_theme: Theme) =>
  createStyles({
    root: {
      marginTop: 16,
      marginBottom: 16
    }
  })
);
