import { baseApi } from "../store/baseApi";
import { IResponse, tagtypes } from "../types/types";

export interface IUpcomingEvent {
    id: string;
    title: string;
    description?: string | null;
    date: Date;
    location?: string | null;
    image?: string | null;
    createdBy: string;
    createdAt: Date;
    updatedAt: Date;
    creator?: { id: string; name: string; email: string };
}

export interface ICreateEvent {
    title: string;
    description?: string;
    date: string;
    location?: string;
    image?: string;
    createdBy: string;
}

const EVENT_URL = "events";

const apiService = baseApi
    .enhanceEndpoints({ addTagTypes: [tagtypes.event] })
    .injectEndpoints({
        endpoints: (build) => ({
            createEvent: build.mutation<IResponse<IUpcomingEvent>, ICreateEvent>({
                query: (data) => ({
                    url: EVENT_URL,
                    method: "POST",
                    data,
                }),
                invalidatesTags: [tagtypes.event],
            }),
            getAllEvents: build.query<IResponse<IUpcomingEvent[]>, string>({
                query: (search) => ({
                    url: EVENT_URL,
                    method: "GET",
                    params: search ? { search } : undefined,
                }),
                providesTags: [tagtypes.event],
            }),
            getEventById: build.query<IResponse<IUpcomingEvent>, string>({
                query: (id) => ({
                    url: `${EVENT_URL}/${id}`,
                    method: "GET",
                }),
                providesTags: [tagtypes.event],
            }),
            updateEvent: build.mutation<IResponse<IUpcomingEvent>, { id: string; data: Partial<IUpcomingEvent> }>({
                query: ({ id, data }) => ({
                    url: `${EVENT_URL}/${id}`,
                    method: "PATCH",
                    data,
                }),
                invalidatesTags: [tagtypes.event],
            }),
            deleteEvent: build.mutation<IResponse<null>, string>({
                query: (id) => ({
                    url: `${EVENT_URL}/${id}`,
                    method: "DELETE",
                }),
                invalidatesTags: [tagtypes.event],
            }),
        }),
    });

export const {
    useCreateEventMutation,
    useGetAllEventsQuery,
    useGetEventByIdQuery,
    useUpdateEventMutation,
    useDeleteEventMutation,
} = apiService;
