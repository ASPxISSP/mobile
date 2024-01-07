import { StyleSheet, View } from 'react-native';

interface GridViewProps<T> {
    data: T[];
    renderItem(item: T): JSX.Element;
    columns?: number;
}

export const GridView = <T,>(props: GridViewProps<T>) => {
    const { data, renderItem, columns = 2 } = props;

    const style = styles(columns);

    return (
        <View style={style.container}>
            {data.map((item, index) => (
                <View key={index} style={style.item}>
                    {renderItem(item)}
                </View>
            ))}
        </View>
    );
};

const styles = (columns: number) =>
    StyleSheet.create({
        container: {
            width: '100%',
            flexDirection: 'row',
            flexWrap: 'wrap'
        },
        item: {
            width: `${100 / columns}%`
        }
    });
