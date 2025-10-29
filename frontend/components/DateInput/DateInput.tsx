import { Platform, TouchableOpacity, View } from "react-native";
import { dateInputStyles } from "./DateInput.style";
import DateTimePicker, {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { Text } from "@/components/Text/Text";
import { useTheme } from "@/context/ThemeContext";

interface DateInputProps {
  date: Date;
  setDate: (date: Date) => void;
}

export const DateInput = ({ date, setDate }: DateInputProps) => {
  const { theme } = useTheme();
  const styles = dateInputStyles(theme);

  const handleDateChange = (
    event: DateTimePickerEvent,
    selectedDate: Date | undefined
  ) => {
    setDate(selectedDate || new Date());
  };

  const showPickerAndroid = () => {
    DateTimePickerAndroid.open({
      value: date,
      onChange: handleDateChange,
      mode: "date",
      is24Hour: true,
    });
  };

  return Platform.OS === "ios" ? (
    <View style={styles.container}>
      <DateTimePicker
        value={date}
        mode="date"
        textColor={theme.colors.text.primary}
        accentColor={theme.colors.text.secondary}
        display="inline"
        themeVariant="light"
        onChange={(event, selectedDate) =>
          handleDateChange(event, selectedDate)
        }
      />
    </View>
  ) : (
    <View style={styles.androidContainer}>
      <TouchableOpacity onPress={showPickerAndroid} style={{width: "100%"}}>
        <Text variant="h4_bold" style={styles.text}>{date.toLocaleDateString()}</Text>
      </TouchableOpacity>
    </View>
  );
};
