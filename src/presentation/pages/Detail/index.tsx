import React, {useMemo, useRef} from 'react';
import Container from '../../components/organisms/Container';
import Carousel from '../../components/molecules/Carousel';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import Text from '../../components/atoms/Text';
import {HStack, VStack} from '../../components/atoms/Layout/Stack';
import {useTheme} from '../../../services/context/Theme/Theme.context';
import {usePlace} from '../../../core/apis/Places/usePlaces';
import Icon from '../../components/atoms/Icon';
import Divider from '../../components/atoms/Layout/Divider';
import Image from '../../components/atoms/Image';
import RenderHTML from 'react-native-render-html';
import {Flex} from '../../components/atoms/Layout';
import WebView from 'react-native-webview';
import IframeRenderer, {iframeModel} from '@native-html/iframe-plugin';

const Detail = ({route}) => {
  const {id} = route.params;
  const bottomSheetRef = useRef<BottomSheet>(null);
  const {pallate} = useTheme();
  const snapPoints = useMemo(() => ['70%', '100%'], []);
  const {data: place} = usePlace(id);
  const {spacing} = useTheme();

  const renderers = {
    iframe: IframeRenderer,
  };

  const customHTMLElementModels = {
    iframe: iframeModel,
  };
  return (
    <Container>
      <Carousel
        name={place?.name}
        prices={place?.price}
        city={place?.city}
        data={place?.images || []}
      />
      <BottomSheet ref={bottomSheetRef} index={0} snapPoints={snapPoints}>
        <BottomSheetScrollView>
          <VStack
            spacing={spacing.standard}
            padding={{paddingHorizontal: spacing.extraLarge}}>
            <Text type="title" weight="01">
              About
            </Text>
            <Text>{place?.desc || 'Loading..'}</Text>
            <Divider color={pallate.whiteout['03']} thickness={1} />
          </VStack>
          <HStack height={80} items="center">
            <VStack spacing={spacing.tiny} fill items="center">
              <Icon name="IconPlane" size={32} color={pallate.blackout['04']} />
              <Text>{place?.flight} Jam</Text>
            </VStack>
            <Divider
              horizontal
              height={50}
              color={pallate.whiteout['03']}
              thickness={1}
            />
            <VStack spacing={spacing.tiny} fill items="center">
              <Icon name="IconClock" size={32} color={pallate.blackout['04']} />
              <Text>{place?.duration} Menit</Text>
            </VStack>
          </HStack>
          <VStack
            spacing={spacing.standard}
            padding={{paddingHorizontal: spacing.extraLarge}}>
            <Divider color={pallate.whiteout['03']} thickness={1} />
            <HStack justify="space-between" fill>
              {place?.images.map(val => (
                <Image
                  width={72}
                  height={72}
                  borderRadius={16}
                  source={{
                    uri: val,
                  }}
                />
              ))}
            </HStack>
          </VStack>
          <VStack
            margin={{
              marginTop: spacing.large,
            }}
            spacing={spacing.standard}
            padding={{paddingHorizontal: spacing.extraLarge}}>
            <Text type="title" weight="01">
              Location
            </Text>
            <Flex height={300} width={300}>
              <RenderHTML
                renderers={renderers}
                customHTMLElementModels={customHTMLElementModels}
                WebView={WebView}
                contentWidth={500}
                source={{
                  html: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.6587669122105!2d112.6310640968769!3d-7.279611840817893!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7fde37c752695%3A0x74e5be7a21cda0f1!2sNisrina%20Futsal%20Center!5e0!3m2!1sid!2sid!4v1683993532674!5m2!1sid!2sid" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
                }}
                renderersProps={{
                  iframe: {
                    scalesPageToFit: true,
                  },
                }}
              />
            </Flex>
          </VStack>
        </BottomSheetScrollView>
      </BottomSheet>
    </Container>
  );
};

export default Detail;
