/**
 * @module HandsChooserProps
 * @author kame-bazooka
 * @license MIT License
 */
import React from "react";

import { HandsChooserStyle } from "./handsChooser.css";

import { Paper, Typography } from "@material-ui/core";

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
   * スタイルシート
   */
  const styleSheet = HandsChooserStyle();

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
    <>
      {
        props.selectedFlags.length >= 5 ? 
          <Typography className={styleSheet.selector}>既に5枚選択済みです</Typography> :
          <div>
            <FlagChooser
              beatFlags={[new OrderFlag(OrderFlagType.Beat)]}
              actionFlags={[new OrderFlag(OrderFlagType.Action)]}
              tryFlags={[new OrderFlag(OrderFlagType.Try)]}
              onSelect={onAddHand}
            />
          </div>
      }
      <Paper elevation={5} className={styleSheet.root}>
      {
        props.selectedFlags.length === 0 ? 
            <Typography className={styleSheet.selector}>何も選択されていません</Typography> :
            <FlagChorusView
              flags={props.selectedFlags}
              onSelect={onDeleteHand}
            />
      }
      </Paper>
    </>
  );
}
