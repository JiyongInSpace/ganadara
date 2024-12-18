<template>
    <v-container class="pa-0 height-screen max-height-screen min-height-screen d-flex flex-column overflow-y-auto">
        <div class="w-100 h-14 d-flex align-center justify-space-between position-relative flex-shrink-0 px-5">
            <v-btn
                icon="mdi-chevron-left"
                size="small"
                variant="text"
            />

            <span class="text-t-xl font-weight-semibold">
                나의 피드
            </span>

            <v-spacer />
        </div>

        <CommunityFeedList
            :feedList="state.feedList"
            my-feed
        />
    </v-container>
</template>

<script lang="ts" setup>
import { IFeedItem } from '@/interfaces';


const state = reactive({
    feedList: [
        {
            id: "1",
            isReported: false,
            user: {
                id: "5",
                name: "김철수",
                profileImage: "/images/class/dummy_profile_image.png",
            },
            content: {
                id: "1",
                date: "2024-08-22",
                text: "영어 공부 오늘 진짜 열심히했다~~!! 내일도 화이팅!",
                images: [
                    "/images/class/default_video.png",
                    "/images/class/default_video.png",
                    "/images/class/default_video.png",
                ],
            },
            likes: [
                {
                    id: "1",
                    name: "홍길동",
                    profileImage: "/images/class/dummy_profile_image.png",
                },
                {
                    id: "1",
                    name: "홍길동",
                    profileImage: "/images/class/dummy_profile_image.png",
                },
                {
                    id: "1",
                    name: "홍길동",
                    profileImage: "/images/class/dummy_profile_image.png",
                },
            ],
            comments: [
                {
                    id: "1",
                    name: "김영희",
                    profileImage: "/images/class/dummy_profile_image.png",
                    text: "와우 대단하다! 영어 공부 오늘 진짜 열심히했다~~!! 내일도 화이팅!",
                    likes: 5,
                    isLiked: true,
                    isReported: false,
                    expanded: false,
                    date: "2024-08-22",
                    replies: [
                        {
                            id: "2",
                            name: "박준호",
                            profileImage: "/images/class/dummy_profile_image.png",
                            text: "정말 대단해요! 저도 김영희님처럼 열심히 해야겠어요.",
                            likes: 3,
                            isLiked: false,
                            isReported: false,
                            date: "2024-08-22",
                            replies: []
                        },
                        {
                            id: "4",
                            name: "최영철",
                            profileImage: "/images/class/dummy_profile_image.png",
                            text: "함께 해요!",
                            likes: 1,
                            isLiked: false,
                            isReported: false,
                            date: "2024-08-22",
                            replies: []
                        }
                    ]
                },
                {
                    id: "1",
                    name: "김영희",
                    profileImage: "/images/class/dummy_profile_image.png",
                    text: "와우 대단하다! 영어 공부 오늘 진짜 열심히했다~~!! 내일도 화이팅!",
                    likes: 5,
                    isLiked: true,
                    isReported: false,
                    expanded: false,
                    date: "2024-08-22",
                    replies: [
                        {
                            id: "2",
                            name: "박준호",
                            profileImage: "/images/class/dummy_profile_image.png",
                            text: "정말 대단해요! 저도 김영희님처럼 열심히 해야겠어요.",
                            likes: 3,
                            isLiked: true,
                            isReported: false,
                            date: "2024-08-22",
                            replies: []
                        },
                        {
                            id: "4",
                            name: "최영철",
                            profileImage: "/images/class/dummy_profile_image.png",
                            text: "함께 해요!",
                            likes: 1,
                            isLiked: false,
                            isReported: false,
                            date: "2024-08-22",
                            replies: []
                        }
                    ]
                },
            ]
        },
        {
            id: "1",
            isReported: false,
            user: {
                id: "6",
                name: "김철수",
                profileImage: "/images/class/dummy_profile_image.png",
            },
            content: {
                id: "1",
                date: "2024-08-22",
                text: "영어 공부 오늘 진짜 열심히했다~~!! 내일도 화이팅!",
                images: [
                    "/images/class/default_video.png",
                    "/images/class/default_video.png",
                    "/images/class/default_video.png",
                ],
                isCommercial: true,
            },
            likes: [
                {
                    id: "1",
                    name: "홍길동",
                    profileImage: "/images/class/dummy_profile_image.png",
                },
                {
                    id: "1",
                    name: "홍길동",
                    profileImage: "/images/class/dummy_profile_image.png",
                },
                {
                    id: "1",
                    name: "홍길동",
                    profileImage: "/images/class/dummy_profile_image.png",
                },
            ],
            comments: [
                {
                    id: "1",
                    name: "김영희",
                    profileImage: "/images/class/dummy_profile_image.png",
                    text: "와우 대단하다! 영어 공부 오늘 진짜 열심히했다~~!! 내일도 화이팅!",
                    likes: 5,
                    isLiked: true,
                    isReported: false,
                    date: "2024-08-22",
                    replies: [
                        {
                            id: "2",
                            name: "박준호",
                            profileImage: "/images/class/dummy_profile_image2.png",
                            text: "정말 대단해요! 저도 김영희님처럼 열심히 해야겠어요.",
                            likes: 3,
                            isLiked: false,
                            isReported: false,
                            date: "2024-08-22",
                            replies: [] // 추가 대댓글이 있다면 이 배열에 또 다른 댓글 객체를 추가
                        }
                    ]
                }
            ]
        },
        {
            id: "1",
            isReported: false,
            user: {
                id: "1",
                name: "김철수",
                profileImage: "/images/class/dummy_profile_image.png",
            },
            content: {
                id: "1",
                date: "2024-08-22",
                text: "영어 공부 오늘 진짜 열심히했다~~!! 내일도 화이팅!",
                images: [
                    "/images/class/default_video.png",
                    "/images/class/default_video.png",
                    "/images/class/default_video.png",
                ],
                isCommercial: false,
            },
            likes: [
                {
                    id: "1",
                    name: "홍길동",
                    profileImage: "/images/class/dummy_profile_image.png",
                },
                {
                    id: "1",
                    name: "홍길동",
                    profileImage: "/images/class/dummy_profile_image.png",
                },
                {
                    id: "1",
                    name: "홍길동",
                    profileImage: "/images/class/dummy_profile_image.png",
                },
            ],
            comments: [
                {
                    id: "1",
                    name: "김영희",
                    profileImage: "/images/class/dummy_profile_image.png",
                    text: "와우 대단하다! 영어 공부 오늘 진짜 열심히했다~~!! 내일도 화이팅!",
                    likes: 5,
                    isLiked: true,
                    isReported: false,
                    date: "2024-08-22",
                    replies: [
                        {
                            id: "2",
                            name: "박준호",
                            profileImage: "/images/class/dummy_profile_image2.png",
                            text: "정말 대단해요! 저도 김영희님처럼 열심히 해야겠어요.",
                            likes: 3,
                            isLiked: false,
                            isReported: false,
                            date: "2024-08-22",
                            replies: []
                        },
                        {
                            id: "4",
                            name: "최영철",
                            profileImage: "/images/class/dummy_profile_image4.png",
                            text: "함께 해요!",
                            likes: 1,
                            isLiked: false,
                            isReported: false,
                            date: "2024-08-22",
                            replies: []
                        }
                    ]
                },
                {
                    id: "3",
                    name: "이수진",
                    profileImage: "/images/class/dummy_profile_image3.png",
                    text: "저도요! 모두 함께 힘내요!",
                    likes: 2,
                    isLiked: true,
                    isReported: false,
                    date: "2024-08-22",
                    replies: []
                }
            ]
        },
    ] as IFeedItem[],
});

</script>
