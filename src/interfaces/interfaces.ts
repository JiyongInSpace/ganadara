import { LEVELS } from './enums'

export interface IChapter {
  levels: LEVELS
  name: string
  id: number
  groupSize: number
  isOpen: boolean
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
  id: string
  isReported: boolean
  user: {
    id: string
    name: string
    profileImage: string
  }
  content: {
    id: string
    date: string
    text: string
    images: string[]
    isCommercial: boolean
  }
  likes: {
    id: string
    name: string
    profileImage: string
  }[]
  comments: IComment[] // 댓글 배열을 IComment 타입으로 업데이트
}
export interface IComment {
  id: string
  name: string
  profileImage: string
  text: string
  likes?: number // 댓글에 '좋아요' 기능 추가를 고려할 수 있습니다.
  isLiked?: boolean // 현재 사용자가 이 댓글을 좋아했는지 여부
  isReported: boolean
  date: string
  replies?: IComment[] // 대댓글 배열
  for?: string[]
}

export interface IRanker {
  id: string
  rank: number
  name: string
  profileImage: string
  score: number
  isFollowing: boolean
}

export interface IUser {
  id: string
  name: string
  profileImage: string
  description: string
  isFollowing: boolean
}

// 전체 보기
export interface ICouponItem {
  id: number
  tag: string
  name: string
  desc: string
  startDate: any
  endDate: any
  isUsed: boolean
}

export interface ITicketItem {
  id?: number
  planName: string
  billingType: string
  paymentPrice: number
  originalPrice?: number
  payNumber?: string
  payInfo?: string
  isPopular?: boolean
  category?: string[]
  startDate: any
  endDate: any
}

export interface IPaymentHistoryItem {
  id: number
  planName: string
  billingType: string
  amount: number
  payNumber: string
  payInfo: string
  timestamp: string
}

export interface IRewardItem {
  id: number
  name: string
  imgUrl: string
  price: number
  status: string
  limit: number
  description?: string
  creator?: {
    id: number
    name: string
    profileImgUrl: string
  }
}

export interface IExamItem {
  id: number
  category?: string
  name: string
  date: string
  wrong: number
  score?: number
  level?: number
  elapsed_time?: number
  ideal_time?: number
}

export interface IBadge {
  imageUrl: string
  name: string
  description: string
  isAchieved: boolean
}

export interface IGoods {
  imageUrl: string
  name: string
  description: string
  points: number
  user: {
    name: string
    profileImage: string
  }
}

export interface IExperienceItem {
  label: string
  percentage: number
}
