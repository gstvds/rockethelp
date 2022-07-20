import { useMemo } from 'react';
import { Button, IButtonProps, Text, useTheme } from 'native-base';

interface FilterProps extends IButtonProps {
  title: string;
  type: 'open' | 'closed';
  isActive?: boolean;
}

export function Filter({ title, type, isActive = false, ...rest }: FilterProps) {
  const { colors } = useTheme();
  const borderColor = useMemo(() => type === 'open' ? colors.secondary[700] : colors.green[300], [type]);
  const titleColor = useMemo(() => isActive ? borderColor : colors.gray[300], [isActive, borderColor]);

  return (
    <Button
      variant="outline"
      borderWidth={isActive ? 1 : 0}
      borderColor={borderColor}
      bgColor="gray.600"
      flex={1}
      size="sm"
      {...rest}
    >
      <Text
        color={titleColor}
        fontSize="xs"
        textTransform="uppercase"
      >
        {title}
      </Text>
    </Button>
  );
}