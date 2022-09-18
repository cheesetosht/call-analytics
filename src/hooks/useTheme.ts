import {useColorScheme} from 'react-native';
import {COLORS} from '../constants/theme';

const useTheme = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const Background = {
    100: isDarkMode ? COLORS.GRAY[800] : COLORS.GRAY[100],
    200: isDarkMode ? COLORS.GRAY[900] : COLORS.GRAY[50],
  };

  const Foreground = {
    100: isDarkMode ? COLORS.GRAY[50] : COLORS.GRAY[900],
    200: isDarkMode ? COLORS.GRAY[100] : COLORS.GRAY[800],
  };

  const accent = isDarkMode ? COLORS.GREEN[300] : COLORS.GREEN[500];

  return {
    isDarkMode,
    Foreground,
    Background,
    accent,
  };
};

export default useTheme;
