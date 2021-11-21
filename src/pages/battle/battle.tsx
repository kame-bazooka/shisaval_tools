/**
 * @module Battle
 * @author kame-bazooka
 * @license MIT License
 */
import React from "react";

import { Box, Text, Grid, Flex, Divider, Button, useColorModeValue } from "@chakra-ui/react";
import { Accordion, AccordionItem, AccordionButton, AccordionPanel} from "@chakra-ui/react";

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
   * 処理ステップがどこまで進んでいるか。「0」が最初。
   */
  const [FAccordionStepIndex, setAccordionStepIndex] = React.useState<number>(0);

  const TurnHeaderStyle = {
    backgroundColor: useColorModeValue("#3F51B5", "gray.900"),
    color: useColorModeValue("white", "white")
  }

  const StepHeaderStyle = {
    backgroundColor: useColorModeValue("red.600", "red.500"),
    color: useColorModeValue("white", "white")
  }

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
    setAccordionStepIndex(0);
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
    setAccordionStepIndex(1);

    let vNewBattleManager: BattleManager = FBattleManager.clone();
    vNewBattleManager.drawHandFlag(FSelectedHands);
    setBattleManager(vNewBattleManager);
    setPredictionBattleManager(vNewBattleManager);
  };

  // コンポーネント作って返す
  return (
    <Box>
      <Box p={2} zIndex="sticky" boxShadow="lg" {...TurnHeaderStyle}>
        <Text fontSize="lg">ターン{FBattleManager.getCurrentTurn()}</Text>
      </Box>
      <Grid p={2} templateColumns="1fr 400px" gap={2}>
        <Box p={2}>
        <Accordion index={FAccordionStepIndex}>
          <AccordionItem isDisabled={FAccordionStepIndex !== 0}>
            <h2>
              <AccordionButton _expanded={StepHeaderStyle}>
                <Box flex="1" textAlign="left">Step1</Box>
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Text>１. ターン開始時に配られたフラッグを、左から順に下のボックスのフラッグをクリックすることで選択してください。選び終わったら「確定」ボタンを押してください。札を選び間違えた場合は、選んだ札をクリックすると消せます。</Text>
              <Box p={2}>
                <HandsChooser selectedFlags={FSelectedHands} onUpdateFlag={onHandsUpdate} />
              </Box>
              <Button m={2} isFullWidth colorScheme="blue" onClick={onStep1Finish}>確定</Button>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem isDisabled={FAccordionStepIndex !== 1}>
            <h2>
              <AccordionButton _expanded={StepHeaderStyle}>
                <Box flex="1" textAlign="left">Step2</Box>
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Text>２．オーダーチェンジをする場合は、下のオーダーチェンジボタンを押してください。しない場合は飛ばして「３」の操作をしてください。</Text>
              <Box p={2}>
                <Button isFullWidth={true} onClick={onOrderChangeBegin} disabled={FSelectedAddHands.length !== 0}>
                  オーダーチェンジをする
                </Button>
                <OrderChange
                  isEnabled={FIsOrderChange}
                  hands={FBattleManager.hands()}
                  predictionBattleManager={FPredictionBattleManager}
                  onFinish={onOrderChangeEnd}
                  onOrderChange={onOrderChange} />
              </Box>
              <Divider mb={4} />
              <Text>３. フラッグをめくった後に追加で配られたフラッグを、出てきた順に全て指定してください。おかわりした分もここで指定してください。たいきスキルによるコーラス自動参加分は含みません。終わったら「ターン終了」ボタンを押してください。</Text>
              <Box p={2}>
                <HandsChooser selectedFlags={FSelectedAddHands} onUpdateFlag={onAddHandsUpdate} />
              </Box>
              <Box p={2}>
                <Button m={2} isFullWidth colorScheme="blue" onClick={onTurnEndButtonClick}>
                  ターン終了
                </Button>
              </Box>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
        </Box>
        <Flex p={2} flexDirection="column">
          <Box p={2} m={2} borderWidth={1}>
            <Text>次ターン開始時の残り山札</Text>
            <FlagChooser
              beatFlags={FPredictionBattleManager.flags().stack().getBeatFlags()}
              actionFlags={FPredictionBattleManager.flags().stack().getActionFlags()}
              tryFlags={FPredictionBattleManager.flags().stack().getTryFlags()}
            />
          </Box>
          <Box p={2} m={2} borderWidth={1}>
            {
              FBattleManager.getCurrentTurn() > 10 ? null :
                <TurnStrategyMemo dayIndex={props.dayIndex} turnIndex={FBattleManager.getCurrentTurn()} />
            }
          </Box>
          <Box p={2} m={2} borderWidth={1}>
            <GeneralCounter />
          </Box>
        </Flex>
      </Grid>
      <Divider mb={4} />
      <Box p={2}>
        <StrategyMemo dayIndex={props.dayIndex} />
      </Box>
    </Box>
  );
}
