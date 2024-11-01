import { LEVELS } from './enums'

export interface IChapter {
  levels: LEVELS
  name: string
  id: number
  groupSize: number
  isLocked: boolean
  state: string
  totalProblems: number
  solvedProblems: number
}

export interface IQuestion {
  type:
    | 'text'
    | 'image'
    | 'audio'
    | 'video'
    | 'script'
    | 'blank'
    | 'sentence'
  prompt: string
  content: string
  resource?: string // URL for image, audio, video, or script files
}

export interface IAnswerOption {
  id: string
  resource: string // Text for text answers or URL for image/audio choices
}

export interface IMultipleAnswerOptions {
  id: string
  question: string
  options: IAnswerOption[]
}

export interface IAnswer {
  type:
    | 'text'
    | 'image'
    | 'audio'
    | 'input'
    | 'speaking'
    | 'shortWord'
    | 'sentence'
    | 'multiple'
  options: IAnswerOption[]
  correctAnswer: string
}

export interface IQuizItem {
  id: string
  question: IQuestion
  answer: IAnswer
}
export interface IUserResponse {
  quizItemId: string // ID of the quiz item
  selectedOptionId: string // ID of the selected answer option
}

// community
export interface IFeedItem {
  user: {
    id: string;
    name: string;
    profileImage: string;
  };
  content: {
    id: string;
    date: string;
    text: string;
    images: string[];
    isCommercial: boolean;
  };
  likes: {
    id: string;
    name: string;
    profileImage: string;
  }[];
  comments: IComment[]; // 댓글 배열을 IComment 타입으로 업데이트
}
export interface IComment {
  id: string;
  name: string;
  profileImage: string;
  text: string;
  likes?: number; // 댓글에 '좋아요' 기능 추가를 고려할 수 있습니다.
  isLiked?: boolean; // 현재 사용자가 이 댓글을 좋아했는지 여부
  date: string;
  replies?: IComment[]; // 대댓글 배열
}

export interface IRanker {
  rank: number;
  name: string;
  profileImage: string;
  score: number;
  isFollowing: boolean;
}

export interface IUser {
  id: string;
  name: string;
  profileImage: string;
  description: string;
  isFollowing: boolean;
}