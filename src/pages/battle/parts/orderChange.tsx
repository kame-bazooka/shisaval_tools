/**
 * @module OrderChange
 * @author kame-bazooka
 * @license MIT License
 */
import React from "react";

import { OrderChangeStyle } from "./orderChange.css";

import Dialog from "@material-ui/core/Dialog";
import { Box, Card, CardContent, CardHeader } from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import FlagChorusView from "../../../components/flagChorusView";
import FlagChooser from "../../../components/flagChooser";

import { OrderFlag, OrderFlagType } from "../../../models/types/orderFlag";
import BattleManager from "../../../models/battleManager";

/**
 * {@link OrderChange}コンポーネントのプロパティです。
 */
export interface OrderChangeProps {
  /**
   * 右側の予測フラッグ表示に使う、予測用の BattleManager を指定します。
   */
  predictionBattleManager: BattleManager;

  /**
   * これを「true」にするとダイアログが表示され、「false」にすると消えます。
   */
  isEnabled: boolean;

  /**
   * 現在の手札を指定します。
   */
  hands: OrderFlag[];

  /**
   * オーダーチェンジが実際行われるたびに発火するイベントを指定します。
   *
   * 第一引数には捨てた手札のインデックスが
   * 第二引数には新たに出てきたフラッグが入っています。
   */
  onOrderChange: (p_drop_index: number, p_new_flag: OrderFlag) => void;

  /**
   * ダイアログを閉じる必要がある時に呼ばれるイベントです。
   */
  onFinish: () => void;
}

/**
 * オーダーチェンジ処理を一式行うダイアログを提供するインタフェースです。
 *
 * このクラスはオーダーチェンジ自体はしません。あくまで必要なUIだけを提供します。
 *
 * @param props {@link OrderChangeProps}型のプロパティ
 * @returns オーダーチェンジダイアログ
 */
export default function OrderChange(props: OrderChangeProps): JSX.Element {
  /**
   * スタイルシート
   */
  const styleSheet = OrderChangeStyle();

  /**
   * 手札セレクタの選択位置
   */
  const [FSelectedHandIndex, setSelectedHandIndex] = React.useState<number | undefined>(undefined);

  /**
   * オーダーチェンジで新たに出てきたとして選択した札
   */
  const [FSelectedNextFlag, setSelectedNextFlag] = React.useState<OrderFlag | undefined>(undefined);

  /**
   * 何回オダチェンしたかのカウンタ。最大５回しかできないはずなので。
   */
  const [FChangeCount, setChangeCount] = React.useState<number>(0);

  /**
   * 親でオダチェンが実行されて手札が変わるたびに
   * 選択状態をクリアするための処理
   */
  React.useEffect(
    () => {
      setSelectedHandIndex(undefined);
      setSelectedNextFlag(undefined);
    },
    [ props.hands ]
  );

  /**
   * 表示状態が切り替わるたびに初期化したい処理
   */
  React.useEffect(
    () => {
      if (props.isEnabled) {
        setSelectedHandIndex(undefined);
        setSelectedNextFlag(undefined);
        setChangeCount(0);
      }
    },
    [ props.isEnabled ]
  );

  /**
   * 手札を選ぶたびに呼ばれるイベント
   * @param p_flag_index 選択された手札インデックス
   */
  const onOrderChangeTarget = (p_flag_index: number) => {
    setSelectedHandIndex(p_flag_index);
  }

  /**
   * オーダーチェンジ後に出てきた札を選ぶたびに呼ばれるイベント
   *
   * @param p_flag_type 選択したフラッグ
   */
  const onOrderChangeNextFlag = (p_flag_type: OrderFlag) => {
    setSelectedNextFlag(p_flag_type);
  }

  /**
   * オーダーチェンジの確定ボタンが押されるたびに呼ばれるイベント
   */
  const onOrderChangeExecute = () => {
    if ((FSelectedHandIndex !== undefined) && (FSelectedNextFlag !== undefined)) {
      // オダチェン
      props.onOrderChange(FSelectedHandIndex, FSelectedNextFlag);

      // オダチェン使い切ったら終わらす
      if (FChangeCount + 1 >= 5) {
        props.onFinish();
      }
      else {
        setChangeCount(FChangeCount + 1);
      }
    }
  }

  // コンポーネント作って返す
  return (
    <Dialog open={props.isEnabled} aria-labelledby="customized-dialog-title" fullWidth={true} maxWidth={"lg"}>
      <MuiDialogTitle disableTypography>
        <Typography variant="h6">オーダーチェンジ（{`残り${5 - FChangeCount}`}回）</Typography>
      </MuiDialogTitle>
      <MuiDialogContent dividers>
        <Grid container direction="row" justifyContent="flex-start" alignItems="flex-start" spacing={2} className={styleSheet.root}>
          <Grid item container direction="row" justifyContent="flex-end" alignItems="flex-start" spacing={2} >
            <Grid item container direction="row" justifyContent="flex-start" alignItems="flex-start" spacing={2} xs={8}>
              <Grid item xs={12}>
                <Typography gutterBottom>
                  1. オーダーチェンジで切り替えたい札を選んでください。
                </Typography>
                <Box p={2}>
                  <FlagChorusView flags={props.hands} highlightIndex={FSelectedHandIndex} onSelect={onOrderChangeTarget} />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Typography gutterBottom>
                  2. 切り替えた後に出てきた札を選んでください。
                </Typography>
                <Box p={2}>
                  <FlagChooser
                    highlightFlag={FSelectedNextFlag}
                    beatFlags={[new OrderFlag(OrderFlagType.Beat)]}
                    actionFlags={[new OrderFlag(OrderFlagType.Action)]}
                    tryFlags={[new OrderFlag(OrderFlagType.Try)]}
                    onSelect={onOrderChangeNextFlag}
                  />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Typography gutterBottom>
                  3. 良ければ以下のボタンで確定してください。
                  もう回数が無い場合は確定と同時にダイアログが閉じます。
                </Typography>
                <Box p={2}>
                  <Button
                    onClick={onOrderChangeExecute} 
                    variant="outlined" 
                    fullWidth={true} 
                    disabled={(FSelectedHandIndex === undefined) || (FSelectedNextFlag === undefined)} 
                  >
                    確定
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Typography gutterBottom>
                  4. まだ回数が残っており、オーダーチェンジを続ける場合は1～3を繰り返し、終わったら終了ボタンで終わらせます。
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <Card className={styleSheet.predictionFlagCard}>
                <CardHeader title="次ターン開始時の残り山札" />
                <CardContent>
                  <FlagChooser
                    beatFlags={props.predictionBattleManager.flags().stack().getBeatFlags()}
                    actionFlags={props.predictionBattleManager.flags().stack().getActionFlags()}
                    tryFlags={props.predictionBattleManager.flags().stack().getTryFlags()}
                  />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </MuiDialogContent>
      <MuiDialogActions>
        <Button onClick={props.onFinish} color="primary">
          終了
        </Button>
      </MuiDialogActions>
    </Dialog>
  );
}
