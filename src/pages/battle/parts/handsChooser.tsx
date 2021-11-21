/**
 * @module HandsChooserProps
 * @author kame-bazooka
 * @license MIT License
 */
import React from "react";
import { Box, Text } from "@chakra-ui/react";

import FlagChooser from "../../../components/flagChooser";
import FlagChorusView from "../../../components/flagChorusView";
import { OrderFlag, OrderFlagType } from "../../../models/types/orderFlag";

/**
 * {@link HandsChooser}コンポーネントのプロパティです。
 */
export interface HandsChooserProps {
  /**
   * 現在選択されている札を指定します。
   */
  selectedFlags: OrderFlag[];

  /**
   * 何かしら編集があった場合に呼ばれます。
   *
   * 引数には編集後の札一覧が入っています。
   */
  onUpdateFlag: (p_new_flags: OrderFlag[]) => void;
}

/**
 * 手札選択用のインタフェースの塊を提供する部品です。
 * 5枚選ぶと追加はできなくなります。
 *
 * このクラスは状態自体は持ちません。外から与える必要があります。
 *
 * @param props {@link HandsChooserProps}型のプロパティ
 * @returns 手札選択コンポーネント
 */
export default function HandsChooser(props: HandsChooserProps): JSX.Element {
  /**
   * フラッグセレクタが選択され、追加の必要がある時に呼ばれるイベントです。
   * 新たに手札にフラッグを追加します。
   *
   * @param p_flag_type 追加されたフラッグ
   */
  const onAddHand = (p_flag_type: OrderFlag) => {
    props.onUpdateFlag([...props.selectedFlags].concat(p_flag_type));
  };

  /**
   * コーラス部品が選択され、いま手札にある札をキャンセルする必要がある時に呼ばれるイベントです。
   * 手札を戻します。
   *
   * @param p_flag_index キャンセルしたい手札の位置
   */
  const onDeleteHand = (p_flag_index: number) => {
    props.onUpdateFlag( props.selectedFlags.filter((_, p_idx: number) => p_idx !== p_flag_index));
  };

  // コンポーネント作って返す
  return (
    <Box p={2}>
      {
        props.selectedFlags.length >= 5 ? 
          <Text>既に5枚選択済みです</Text> :
          <Box>
            <FlagChooser
              beatFlags={[new OrderFlag(OrderFlagType.Beat)]}
              actionFlags={[new OrderFlag(OrderFlagType.Action)]}
              tryFlags={[new OrderFlag(OrderFlagType.Try)]}
              onSelect={onAddHand}
            />
          </Box>
      }
      <Box p={2} zIndex="sticky" boxShadow="lg">
      {
        props.selectedFlags.length === 0 ? 
            <Text>何も選択されていません</Text> :
            <FlagChorusView
              flags={props.selectedFlags}
              onSelect={onDeleteHand}
            />
      }
      </Box>
    </Box>
  );
}
