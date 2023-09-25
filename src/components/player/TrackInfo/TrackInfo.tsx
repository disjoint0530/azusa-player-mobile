import React from 'react';
import type { Track } from 'react-native-track-player';
import { Dimensions } from 'react-native';

import TrackInfoTemplate from './TrackInfoTemplate';
import AlbumArt from './AlbumArt';

interface Props {
  track?: Track;
  windowWidth?: number;
}
const TrackInfo: React.FC<Props> = ({ track, windowWidth }) => {
  const dimension = Dimensions.get('window');
  windowWidth = windowWidth || Math.min(dimension.width, dimension.height);

  return (
    <TrackInfoTemplate track={track}>
      <AlbumArt
        track={track}
        windowWidth={windowWidth}
        windowHeight={windowWidth}
      />
    </TrackInfoTemplate>
  );
};

export default TrackInfo;
