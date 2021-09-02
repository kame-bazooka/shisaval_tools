/**
 * @module Battle
 * @author kame-bazooka
 * @license MIT License
 */
import React from "react";

import { BattleStyle } from "./battle.css";

import { AppBar, Toolbar, Typography, Box } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";

import BattleManager from "../../models/battleManager";
import { OrderFlag } from "../../models/types/orderFlag";

import FlagChooser from "../../components/flagChooser";

import OrderChange from "./parts/orderChange";
import StrategyMemo from "../battleSetup/parts/strategyMemo";
import TurnStrategyMemo from "./parts/turnStrategyMemo";
import HandsChooser from "./parts/handsChooser";
import GeneralCounter from "./parts/generalCounter";

/**
 * {@link Battle}コンポーネントのプロパティです。
 */
export interface BattleProps {
  /**
   * 戦闘を始める曜日インデックス
   */
  dayIndex: number;

  /**
   * 初期オーダーフラッグ一式
   */
  initialFlags: Array<OrderFlag>;
}

/**
 * 戦闘ページの本体です。
 *
 * @param props {@link BattleProps}型のプロパティ
 * @returns 戦闘ページ
 */
export default function Battle(props: BattleProps): JSX.Element {
  /**
   * スタイルシート
   */
  const styleSheet = BattleStyle();

  /**
   * 確定された状態の入ったバトルマネージャ
   */
  const [FBattleManager, setBattleManager] = React.useState(
    new BattleManager(props.initialFlags)
  );

  /**
   * 予測状態が入ったバトルマネージャ
   */
  const [FPredictionBattleManager, setPredictionBattleManager] = React.useState(
    new BattleManager(props.initialFlags)
  );

  /**
   * 画面で選択されている手札
   */
  const [FSelectedHands, setSelectedHands] = React.useState<OrderFlag[]>(
    []
  );

  /**
   * 画面で選択されている、手札を引いた後にめくって出てきた札
   */
  const [FSelectedAddHands, setSelectedAddHands] = React.useState<OrderFlag[]>(
    []
  );

  /**
   * オダチェンマネージャが入っていたらオダチェン中。
   * undefinedならやっていない。
   */
  const [FIsOrderChange, setOrderChange] = React.useState<boolean>(false);

  /**
   * 処理ステップがどこまで進んでいるか。「1」が最初。
   */
  const [FAccordionStepIndex, setAccordionStepIndex] = React.useState<number>(1);

  /**
   * ターン終了ボタンを押した時のイベントハンドラ
   */
  const onTurnEndButtonClick = () => {
    // フラグを確定させて
    let vNewBattleManager: BattleManager = FBattleManager.clone();
    vNewBattleManager.drawHandFlag(FSelectedAddHands);
    vNewBattleManager.turnEnd();
    setBattleManager(vNewBattleManager);
    setPredictionBattleManager(vNewBattleManager);

    // 次のターンに進む
    setSelectedHands([]);
    setSelectedAddHands([]);
    setAccordionStepIndex(1);
  };

  /**
   * オーダーチェンジを行って、札の入れ替えをしたときに呼ばれるイベント
   *
   * @param p_drop_index 捨てる手札のインデックス位置
   * @param p_new_flag 新たに引いた札
   */
  const onOrderChange = (p_drop_index: number, p_new_flag: OrderFlag) => {
    // オダチェンして次へ進む
    if (FIsOrderChange) {
      let vNewBattleManager: BattleManager = FBattleManager.clone();
      vNewBattleManager.orderChange(p_drop_index, p_new_flag);
      setBattleManager(vNewBattleManager);
      setPredictionBattleManager(vNewBattleManager);
    }
  }

  /**
   * オーダーチェンジが終わった時に呼ばれるイベント
   */
  const onOrderChangeEnd = () => {
    // 作業中のオーダーチェンジを確定させる
    if (FIsOrderChange) {
      setOrderChange(false);
    }
  }

  /**
   * オーダーチェンジを始める時に呼ばれるイベント
   */
  const onOrderChangeBegin = () => {
    setOrderChange(true);
  }

  /**
   * 最初に配られた手札の選択状態が変わると呼ばれる処理
   *
   * @param p_new_flags 新たに選択された手札一式
   */
  const onHandsUpdate = (p_new_flags: OrderFlag[]) => {
    setSelectedHands(p_new_flags);

    // 予測も毎回更新する
    let vNewBattleManager: BattleManager = FBattleManager.clone();
    vNewBattleManager.drawHandFlag(p_new_flags);
    setPredictionBattleManager(vNewBattleManager);
  };

  /**
   * 山札配った後にめくって出てきた札の選択状態が変わると呼ばれる処理
   *
   * @param p_new_flags 新たに選択された手札一式
   */
  const onAddHandsUpdate = (p_new_flags: OrderFlag[]) => {
    setSelectedAddHands(p_new_flags);

    // 予測も毎回更新する
    let vNewBattleManager: BattleManager = FBattleManager.clone();
    vNewBattleManager.drawHandFlagAdd(p_new_flags);
    setPredictionBattleManager(vNewBattleManager);
  };

  /**
   * ステップ１が終わった時に呼ばれるイベント
   */
  const onStep1Finish = () => {
    // 手札を固定化して次のステップに進む
    setAccordionStepIndex(2);

    let vNewBattleManager: BattleManager = FBattleManager.clone();
    vNewBattleManager.drawHandFlag(FSelectedHands);
    setBattleManager(vNewBattleManager);
    setPredictionBattleManager(vNewBattleManager);
  };

  // コンポーネント作って返す
  return (
    <Box className={styleSheet.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography>ターン{FBattleManager.getCurrentTurn()}</Typography>
        </Toolbar>
      </AppBar>
      <Box p={3}>
        <Grid container direction="row" justifyContent="flex-start" alignItems="flex-start" spacing={2}>
          <Grid item container direction="row" justifyContent="flex-end" alignItems="flex-start" spacing={2}>
            <Grid item container direction="row" justifyContent="flex-start" alignItems="flex-start" spacing={2} xs={8}>
              <div className={styleSheet.accordionRoot}>
                <Accordion expanded={FAccordionStepIndex === 1} disabled={FAccordionStepIndex !== 1}>
                  <AccordionSummary>
                    <Typography>Step1</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container direction="row" spacing={2} className={styleSheet.accordionGrid}>
                      <Grid item xs={12}>
                        <Typography>
                          １. ターン開始時に配られたフラッグを、左から順に下のボックスのフラッグをクリックすることで選択してください。選び終わったら「確定」ボタンを押してください。
                          札を選び間違えた場合は、選んだ札をクリックすると消せます。
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <HandsChooser selectedFlags={FSelectedHands} onUpdateFlag={onHandsUpdate} />
                      </Grid>
                      <Grid item xs={2} />
                      <Grid item xs>
                        <Button
                          className={styleSheet.orderChangeButton}
                          variant="outlined"
                          fullWidth={true}
                          onClick={onStep1Finish}
                        >
                          確定
                        </Button>
                      </Grid>
                      <Grid item xs={2} />
                    </Grid>
                  </AccordionDetails>
                </Accordion>
                <Accordion expanded={FAccordionStepIndex === 2} disabled={FAccordionStepIndex !== 2}>
                  <AccordionSummary>
                    <Typography>Step2</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container direction="row" spacing={2} className={styleSheet.accordionGrid}>
                      <Grid item xs={12}>
                        <Typography>
                        ２．オーダーチェンジをする場合は、下のオーダーチェンジボタンを押してください。しない場合は飛ばして「３」の操作をしてください。
                        </Typography>
                      </Grid>
                      <Grid item xs={2} />
                      <Grid item xs>
                        <Button
                          className={styleSheet.orderChangeButton}
                          variant="outlined"
                          fullWidth={true}
                          onClick={onOrderChangeBegin}
                          disabled={FSelectedAddHands.length !== 0}
                        >
                          オーダーチェンジをする
                        </Button>
                        <OrderChange
                          isEnabled={FIsOrderChange}
                          hands={FBattleManager.hands()}
                          predictionBattleManager={FPredictionBattleManager}
                          onFinish={onOrderChangeEnd}
                          onOrderChange={onOrderChange} />
                      </Grid>
                      <Grid item xs={2} />
                      <Grid item xs={12}>
                        <hr />
                      </Grid>
                      <Grid item xs={12}>
                        <Typography>
                          ３. フラッグをめくった後に追加で配られたフラッグを、出てきた順に全て指定してください。
                        </Typography>
                        <Typography>
                          おかわりした分もここで指定してください。たいきスキルによるコーラス自動参加分は含みません。
                          終わったら「ターン終了」ボタンを押してください。
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <HandsChooser selectedFlags={FSelectedAddHands} onUpdateFlag={onAddHandsUpdate} />
                      </Grid>
                      <Grid item xs={1} />
                        <Grid item xs={10}>
                          <Button
                            variant="outlined"
                            color="primary"
                            fullWidth={true}
                            onClick={onTurnEndButtonClick}
                          >
                            ターン終了
                          </Button>
                        </Grid>
                        <Grid item  xs={1} />
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              </div>
            </Grid>

            <Grid item xs={4}>
              <Card className={styleSheet.predictionFlagCard}>
                <CardHeader title="次ターン開始時の残り山札" />
                <CardContent>
                  <FlagChooser
                    beatFlags={FPredictionBattleManager.flags().stack().getBeatFlags()}
                    actionFlags={FPredictionBattleManager.flags().stack().getActionFlags()}
                    tryFlags={FPredictionBattleManager.flags().stack().getTryFlags()}
                  />
                </CardContent>
              </Card>
              {
                FBattleManager.getCurrentTurn() > 10 ? null :
                  <Card className={styleSheet.turnMemoCard}>
                    <CardContent>
                      <TurnStrategyMemo dayIndex={props.dayIndex} turnIndex={FBattleManager.getCurrentTurn()} />
                    </CardContent>
                  </Card>
              }
              <Card className={styleSheet.enemyPunchCounterCard}>
                <CardContent>
                  <GeneralCounter />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Grid item container xs={12}>
            <Grid item xs={12}>
              <hr />
            </Grid>
            <Grid item xs={12}>
              <StrategyMemo dayIndex={props.dayIndex} />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
