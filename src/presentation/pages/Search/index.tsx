import React from 'react';
import Container from '../../components/organisms/Container';
import Text from '../../components/atoms/Text';
import SearchBar from '../../components/atoms/SearchBar';
import {useTheme} from '../../../services/context/Theme/Theme.context';

const Search = () => {
  const {pallate, spacing} = useTheme();

  return (
    <Container
      spacing={spacing.standard}
      padding={{
        paddingVertical: spacing.large,
        paddingHorizontal: spacing.extraLarge,
      }}>
      <Text type="title" weight="01">
        Cari
      </Text>
      <SearchBar
        icon={{
          name: 'IconSearch',
          size: 24,
          color: pallate.blackout['04'],
        }}
        placeholder="Cari tujuanmu disini.."
      />
    </Container>
  );
};

export default Search;
