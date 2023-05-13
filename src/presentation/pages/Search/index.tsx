import React from 'react';
import Container from '../../components/organisms/Container';
import Text from '../../components/atoms/Text';
import SearchBar from '../../components/atoms/SearchBar';
import {useTheme} from '../../../services/context/Theme/Theme.context';
import {MasonryFlashList} from '@shopify/flash-list';
import usePlaces from '../../../core/apis/Places/usePlaces';
import {HStack, VStack} from '../../components/atoms/Layout/Stack';
import {ImageBackground} from 'react-native';
import Pressable from '../../components/atoms/Pressable';

const Search = () => {
  const {pallate, spacing} = useTheme();
  const {data: places} = usePlaces();
  console.log(places);
  return (
    <Container
      backgroundColor={pallate.whiteout['02']}
      spacing={spacing.standard}
      padding={{
        paddingVertical: spacing.large,
        paddingHorizontal: spacing.extraLarge,
      }}>
      <Text type="title" weight="01">
        Cari
      </Text>
      <SearchBar
        backgroundColor={pallate.whiteout['01']}
        icon={{
          name: 'IconSearch',
          size: 24,
          color: pallate.blackout['04'],
        }}
        placeholder="Cari tujuanmu disini.."
      />
      <MasonryFlashList
        data={places}
        numColumns={2}
        estimatedItemSize={300}
        renderItem={({item, index}) => (
          <Pressable>
            <VStack
              padding={{
                paddingLeft: index === 1 ? spacing.small : 0,
                paddingRight: index === 1 ? 0 : spacing.small,
              }}
              width="100%">
              <ImageBackground
                imageStyle={{
                  borderTopLeftRadius: 16,
                  borderTopRightRadius: 16,
                }}
                style={{
                  height: 200,
                }}
                source={{
                  uri: item.image,
                }}>
                <HStack items="center"></HStack>
              </ImageBackground>
              <VStack
                spacing={spacing.large}
                backgroundColor={pallate.whiteout['01']}
                padding={spacing.standard}>
                <VStack>
                  <Text type="title" weight="03">
                    {item.name}
                  </Text>
                  <Text>{item.city}</Text>
                </VStack>
                <Text>{item.desc}</Text>
              </VStack>
            </VStack>
          </Pressable>
        )}
      />
    </Container>
  );
};

export default Search;
