/**
 * @module OrderChange
 * @author kame-bazooka
 * @license MIT License
 */
import React from "react";
import { Text, Button, Box, Grid } from "@chakra-ui/react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody } from "@chakra-ui/react";

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

  /**
   * ダイアログの外枠をクリックした時のイベントです。
   * 必須なので指定していますが、閉じられたりしたくないので、何もしません。
   */
  const onDummyFinish = () => {
    // 何もしない
  };

  // コンポーネント作って返す
  return (
    <Modal onClose={onDummyFinish} isOpen={props.isEnabled}>
      <ModalOverlay />
      <ModalContent minW="1024px">
        <ModalHeader>オーダーチェンジ（{`残り${5 - FChangeCount}`}回）</ModalHeader>
        <ModalBody>
        <Grid p={2} templateColumns="1fr 400px" gap={2}>
          <Box p={2}>
            <Text>1. オーダーチェンジで切り替えたい札を選んでください。</Text>
            <Box p={2}>
              <FlagChorusView flags={props.hands} highlightIndex={FSelectedHandIndex} onSelect={onOrderChangeTarget} />
            </Box>
            <Text>2. 切り替えた後に出てきた札を選んでください。</Text>
            <Box p={2}>
              <FlagChooser
                highlightFlag={FSelectedNextFlag}
                beatFlags={[new OrderFlag(OrderFlagType.Beat)]}
                actionFlags={[new OrderFlag(OrderFlagType.Action)]}
                tryFlags={[new OrderFlag(OrderFlagType.Try)]}
                onSelect={onOrderChangeNextFlag}
              />
            </Box>
            <Text>3. 良ければ以下のボタンで確定してください。もう回数が無い場合は確定と同時にダイアログが閉じます。</Text>
            <Box p={2}>
              <Button
                isFullWidth
                onClick={onOrderChangeExecute}
                disabled={(FSelectedHandIndex === undefined) || (FSelectedNextFlag === undefined)} 
              >
                確定
              </Button>
            </Box>
            <Text>4. まだ回数が残っており、オーダーチェンジを続ける場合は1～3を繰り返し、終わったら終了ボタンで終わらせます。</Text>
          </Box>
          <Box p={2} m={2} borderWidth={1}>
            <Text>次ターン開始時の残り山札</Text>
            <FlagChooser
              beatFlags={props.predictionBattleManager.flags().stack().getBeatFlags()}
              actionFlags={props.predictionBattleManager.flags().stack().getActionFlags()}
              tryFlags={props.predictionBattleManager.flags().stack().getTryFlags()}
            />
          </Box>
        </Grid>
        </ModalBody>
        <ModalFooter>
          <Button isFullWidth colorScheme="blue" mr={3} onClick={props.onFinish}>終了</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
