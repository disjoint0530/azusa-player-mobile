import React from 'react';
import TrackPlayer, { Track } from 'react-native-track-player';

import LottieButton from '@components/buttons/LottieButton';
import { resetResolvedURL } from '@stores/appStore';
import { resolveAndCache } from '@utils/RNTPUtils';

interface Props {
  track?: Track;
}

export default ({ track }: Props) => {
  const song = track?.song as NoxMedia.Song;

  const onClick = async () => {
    if (!song) return;
    resetResolvedURL(song);
    const currentTrack = await TrackPlayer.getActiveTrack();
    const updatedMetadata = await resolveAndCache(song);
    await TrackPlayer.load({ ...currentTrack, ...updatedMetadata });
  };

  return (
    <LottieButton
      src={require('@assets/lottie/refresh.json')}
      size={30}
      onPress={onClick}
      strokes={['Arrowhead', 'Line', 'Arrowhead 2', 'Line 2']}
    />
  );
};
