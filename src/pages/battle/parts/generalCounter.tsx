/**
 * @module GeneralCounter
 * @author kame-bazooka
 * @license MIT License
 */
import React from "react";

import { Box, Text } from "@chakra-ui/react";
import { NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper} from "@chakra-ui/react";

/**
 * 主に強敵を殴った数カウンターコンポーネントです。
 *
 * これ単体で状態を持つので、単に貼り付けるだけでどこでもカウンタになります。
 *
 * @returns 強敵殴った数カウンターコンポーネント
 */
export default function GeneralCounter(): JSX.Element {
  /**
   * 強敵を殴った数
   */
  const [FPunchCount, setPunchCount] = React.useState(0);

  const onCounterChange = (p_value_str: string, p_value_num: number) => {
    setPunchCount(p_value_num);
  };

  // コンポーネントを作って返す
  return (
    <Box>
      <Text>カウンタ</Text>
      <NumberInput size="sm" defaultValue={FPunchCount} min={0} onChange={onCounterChange}>
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </Box>
  );
}
