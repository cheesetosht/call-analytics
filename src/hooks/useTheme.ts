import {useColorScheme} from 'react-native';
import {COLORS} from '../constants/theme';

const useTheme = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const background = {
    100: isDarkMode ? COLORS.GRAY[800] : COLORS.GRAY[100],
    200: isDarkMode ? COLORS.GRAY[900] : COLORS.GRAY[50],
  };

  const foreground = {
    100: isDarkMode ? COLORS.GRAY[50] : COLORS.GRAY[900],
    200: isDarkMode ? COLORS.GRAY[100] : COLORS.GRAY[800],
  };

  return {
    isDarkMode,
    foreground,
    background,
  };
};

export default useTheme;
