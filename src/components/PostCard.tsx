import React from 'react';
import { Button } from '@/components/ui/button';
import { formatDistanceToNowStrict  } from 'date-fns';
import { GreyContainer } from './ui/greyContainer';
import Comments from './ui/comments';
import Send from './ui/send';
import Heart from './ui/heart';
import { useToast } from './ui/toaster';
import { ProfilePlaceholder } from './ui/profile-placeholder';
import { FadeIn } from './ui/fade-in';

interface PostCardProps {
  profile?: string;
  username: string;
  content: string;
  createdAt: Date;
  emoji?: string;
}

export const PostCard: React.FC<PostCardProps> = ({
  profile,
  username,
  content,
  createdAt,
  emoji = '😊'
}) => {
  
  const { toast } = useToast();

  const handleInteraction = () => {
    toast('Function not implemented', 'info');
  };

  return (
    <FadeIn>
      <GreyContainer>
        <div className="bg-white border border-secondaryGrey rounded-medium shadow-sm p-4">
        <div className="flex items-start gap-3">
          {profile ? (
            <img src={profile} alt="Profile" className="w-[37px] h-[37px] rounded-tiny object-cover" />
          ) : (
            <ProfilePlaceholder />
          )}
          <div>
            <p className="font-semibold text-[13px]">{username}</p>
            <p className="text-sm font-medium text-pentagonalGrey">
              {
                formatDistanceToNowStrict (new Date(createdAt), { addSuffix: true })
              }
            </p>
          </div>
        </div>
        <div className="mt-[10px] flex gap-5 ps-1">
          <div className="h-7 w-7 flex items-center justify-center bg-customGrey rounded-full"><span className="text-xl">{emoji}</span></div>
          <div dangerouslySetInnerHTML={{ __html: content }} className="text-sm font-medium text-darkGrey leading-5"></div>
        </div>
      </div>
      <div className="flex items-center gap-4 ps-4">
        <Button
          variant="noBackground"
          size="sm"
          onClick={handleInteraction}
          className="text-gray-600 h-8 w-8 px-0 rounded-xSmall transition-all duration-200 [&_svg:hover_path]:stroke-red-500 [&_svg:hover]:scale-110"
        >
          <Heart />
        </Button>
        <Button
          variant="noBackground"
          size="sm"
          onClick={handleInteraction}
          className="text-gray-600 h-8 w-8 px-0 rounded-xSmall transition-all duration-200 [&_svg:hover_path]:stroke-yellow-500 [&_svg:hover]:scale-110"
        >
          <Comments />
        </Button>
        <Button
          variant="noBackground"
          size="sm"
          onClick={handleInteraction}
          className="text-gray-600 h-8 w-8 px-0 rounded-xSmall  transition-all duration-200 [&_svg:hover_path]:stroke-blue-500 [&_svg:hover]:scale-110"
        >
          <Send />
        </Button>
      </div>
    </GreyContainer>
    </FadeIn>
  );
};
