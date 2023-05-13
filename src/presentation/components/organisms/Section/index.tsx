import React from 'react';
import {HStack, StackProps, VStack} from '../../atoms/Layout/Stack';
import Text from '../../atoms/Text';
import {useTheme} from '../../../../services/context/Theme/Theme.context';

interface SectionProps extends StackProps {
  title: string;
  description: string;
  useFilter?: boolean;
}

const Section = (props: SectionProps) => {
  const {title, description, children} = props;
  const {spacing, pallate} = useTheme();
  return (
    <VStack spacing={spacing.medium}>
      <HStack padding={{paddingHorizontal: spacing.large}}>
        <VStack spacing={spacing.small}>
          <Text type="title" weight="01">
            {title}
          </Text>
          <Text color={pallate.blackout['01']}>{description}</Text>
        </VStack>
      </HStack>
      {children}
    </VStack>
  );
};

export default Section;
