import { Image, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import OcticonsIcons from 'react-native-vector-icons/Octicons';
import { Puzzle } from '../../store/puzzles/types';

interface PuzzleTileProps {
    index: number;
    isUnlocked: boolean;
    puzzle: Puzzle;
}

export const PuzzleTile = ({ index, isUnlocked, puzzle }: PuzzleTileProps) => {
    return (
        <TouchableOpacity>
            <Text>{index}</Text>
            {isUnlocked ? (
                <Image
                    source={{
                        // eslint-disable-next-line max-len
                        uri: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.tenstickers.pl%2Fnaklejki%2Fnaklejka-na-sciane-puzzle-4634&psig=AOvVaw2Qv_iABBoc8szqEvNQaw2Q&ust=1702488072730000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCMilvLi0ioMDFQAAAAAdAAAAABAE'
                    }}
                />
            ) : (
                <OcticonsIcons name='lock' />
            )}
        </TouchableOpacity>
    );
};
