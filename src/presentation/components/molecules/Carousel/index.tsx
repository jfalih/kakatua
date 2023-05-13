import React, {useCallback, useEffect, useRef, useState} from 'react';
import PagerView, {PagerViewProps} from 'react-native-pager-view';
import Pressable from '../../atoms/Pressable';
import Image from '../../atoms/Image';
import {HStack, VStack} from '../../atoms/Layout/Stack';
import {Box, Flex} from '../../atoms/Layout';
import {useTheme} from '../../../../services/context/Theme/Theme.context';
import {ImageBackground, StyleSheet, useWindowDimensions} from 'react-native';
import Text from '../../atoms/Text';

interface CarouselProps extends PagerViewProps {
  data: [];
  isDetail?: boolean;
  autoSlide: boolean;
}

const Carousel = (props: CarouselProps) => {
  const {data, isDetail, autoSlide = true, style} = props;
  const {pallate, spacing} = useTheme();
  const [page, setPage] = useState(0);
  const pageViewRef = useRef();
  const timeout = useRef<number>();
  const stopAutoSlide = useCallback(() => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
  }, []);

  const startAutoSlide = useCallback(() => {
    if (data.length > 1 && autoSlide) {
      timeout.current = setTimeout(() => {
        if (page < data.length - 1) {
          pageViewRef.current?.setPage(page + 1);
        } else {
          pageViewRef.current?.setPage(0);
        }
      }, 3000);
    }
  }, [autoSlide, data.length, page]);

  useEffect(() => {
    startAutoSlide();
    return () => {
      stopAutoSlide();
    };
  }, [startAutoSlide, stopAutoSlide]);
  return (
    <Box>
      <PagerView
        ref={pageViewRef}
        style={carouselStyle.image}
        onPageSelected={e => setPage(e.nativeEvent.position)}
        scrollEnabled>
        {data.map((val, index) => (
          <Flex key={index}>
            <Pressable shrink={false}>
              <ImageBackground
                source={{uri: val.image}}
                style={[
                  carouselStyle.image,
                  {
                    justifyContent: 'flex-end',
                  },
                  style,
                ]}>
                <HStack
                  backgroundColor={'rgba(0,0,0,0.4)'}
                  fill
                  items="flex-end"
                  justify="space-between"
                  padding={{
                    paddingTop: spacing.large,
                    paddingBottom: spacing.large * 2 + spacing.standard,
                    paddingHorizontal: spacing.large,
                  }}>
                  <VStack>
                    <Text
                      color={pallate.whiteout['01']}
                      type="title"
                      weight="01">
                      Bromo
                    </Text>
                    <Text
                      color={pallate.whiteout['01']}
                      type="title"
                      weight="05">
                      Magelang
                    </Text>
                  </VStack>
                  <Text type="title" weight="05" color={pallate.whiteout['01']}>
                    Rp300.000,00
                  </Text>
                </HStack>
              </ImageBackground>
            </Pressable>
          </Flex>
        ))}
      </PagerView>
      <HStack
        spacing={spacing.small}
        position={{
          bottom: 40,
          left: spacing.large,
        }}>
        {data.map((val, index) => (
          <Box
            backgroundColor={
              page === index ? pallate.blackout['05'] : pallate.whiteout['03']
            }
            height={3}
            borderRadius={1}
            width={page === index ? 32 : 14}
          />
        ))}
      </HStack>
    </Box>
  );
};

const carouselStyle = StyleSheet.create({
  image: {height: 'auto', width: '100%', aspectRatio: 3 / 2},
});
export default Carousel;
