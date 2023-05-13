import React, {useMemo, useRef} from 'react';
import Container from '../../components/organisms/Container';
import Carousel from '../../components/molecules/Carousel';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import Text from '../../components/atoms/Text';
import {VStack} from '../../components/atoms/Layout/Stack';
import {useTheme} from '../../../services/context/Theme/Theme.context';

const Detail = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['70%', '100%'], []);
  const {spacing} = useTheme();
  return (
    <Container
      navbar={{
        type: 'back',
        title: 'Bromo',
        zIndex: 10,
        position: {
          top: 0,
        },
        width: '100%',
      }}>
      <Carousel
        data={[
          {
            image:
              'https://cdn.dribbble.com/userupload/3848141/file/original-4229832f3697e7359baad498530d1d58.png?compress=1&resize=640x480&vertical=top',
          },
          {
            image:
              'https://cdn.dribbble.com/userupload/3848141/file/original-4229832f3697e7359baad498530d1d58.png?compress=1&resize=640x480&vertical=top',
          },
        ]}
      />
      <BottomSheet ref={bottomSheetRef} index={0} snapPoints={snapPoints}>
        <BottomSheetScrollView>
          <VStack padding={{paddingHorizontal: spacing.extraLarge}}>
            <Text type="title" weight="01">
              About
            </Text>
            <VStack height={1000}></VStack>
          </VStack>
        </BottomSheetScrollView>
      </BottomSheet>
    </Container>
  );
};

export default Detail;
