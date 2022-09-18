import {Text, ViewProps} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import useTheme from '../hooks/useTheme';

interface IHeaderProps extends ViewProps {}

const Header: React.FC<IHeaderProps> = () => {
  const {isDarkMode, Foreground, Background, accent} = useTheme();
  return (
    <LinearGradient
      colors={[accent, 'rgba(10,10,10,0.2)']}
      locations={[0.1, 1]}
      style={{
        backgroundColor: accent,
        height: 124,
        justifyContent: 'flex-end',
        paddingBottom: 16,
      }}>
      <Text
        style={{
          color: Background[100],
          fontWeight: '700',
          fontSize: 32,
          textAlign: 'center',
        }}>
        Call Analyzer
      </Text>
    </LinearGradient>
  );
};

export default Header;
