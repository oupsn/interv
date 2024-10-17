/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export type AddQuestionData = HandlersResponseString

export type AddQuestionError = HandlersErrResponse

export interface AdminCreateBody {
  name: string
  password: string
  portalId: number
  role: string
  username: string
}

export interface CodingInterviewAddQuestionQuery {
  codingQuestionID: number
  target: string
  targetID: number
}

export interface CodingInterviewCreateQuestionQuery {
  body: DomainsCreateCodingQuestionRequest
}

export interface CodingInterviewGetCompileResultQuery {
  body: DomainsCompilationRequest
}

export interface CodingInterviewGetSubmissionResultByUserQuery {
  userID: number
}

export interface CodingInterviewUpdateQuestionQuery {
  body: DomainsCreateCodingQuestionRequest
  codingQuestionID: number
}

export type CreateAdminData = HandlersResponseUser

export type CreateAdminError = HandlersErrResponse

export type CreateCodingSubmissionData = HandlersResponseString

export type CreateCodingSubmissionError = HandlersErrResponse

export type CreateCodingSubmissionPayload = DomainsCreateCodingSubmissionRequest[]

export interface CreatePortalBody {
  company_name: string
}

export type CreatePortalData = HandlersResponsePortalData

export type CreatePortalError = HandlersErrResponse

export type CreateQuestionData = HandlersResponseDomainsCodingQuestion

export type CreateQuestionError = HandlersErrResponse

export type CreateQuestionSnapshotData = HandlersResponseString

export type CreateQuestionSnapshotError = HandlersErrResponse

export type CreateQuestionSnapshotPayload = DomainsCodingQuestionSnapshot[]

export interface CreateRoomBody {
  candidateId: number
  workspaceId: number
}

export type CreateRoomData = HandlersResponseCreateRoomResponse

export type CreateRoomError = HandlersErrResponse

export interface CreateRoomResponse {
  candidateId: number
  roomId: string
}

export type CreateUserData = HandlersResponseUser

export type CreateUserError = HandlersErrResponse

export interface CreateVideoQuestionBody {
  portalId: number
  timeToAnswer: number
  timeToPrepare: number
  title: string
  totalAttempt: number
}

export type CreateVideoQuestionData = HandlersResponseCreateVideoQuestionResponse

export type CreateVideoQuestionError = HandlersErrResponse

export interface CreateVideoQuestionResponse {
  createdAt?: string
  id?: number
  portalId?: number
  timeToAnswer?: number
  timeToPrepare?: number
  title?: string
  totalAttempt?: number
  updatedAt?: string
}

export interface CreateWorkspaceBody {
  codeQuestion: number[]
  codingTime?: number
  endDate: string
  isCoding: boolean
  isVideo: boolean
  portalId: number
  reqCamera: boolean
  reqMicrophone: boolean
  reqScreen: boolean
  startDate: string
  title: string
  videoQuestion: number[]
  videoTime?: number
}

export type CreateWorkspaceData = HandlersResponseWorkspaceDetail

export type CreateWorkspaceError = HandlersErrResponse

export interface CurrentUserResponse {
  created_at: string
  id: number
  name: string
  portalId: number
  role: string
  updated_at: string
  username: string
}

export interface DeletePortalBody {
  id: number
}

export type DeletePortalByIdData = HandlersResponseString

export type DeletePortalByIdError = HandlersErrResponse

export type DeleteQuestionData = HandlersResponseString

export type DeleteQuestionError = HandlersErrResponse

export type DeleteUserData = HandlersResponseString

export type DeleteUserError = HandlersErrResponse

export interface DeleteUserFromWorkspaceBody {
  userId: number
  workspaceId: number
}

export type DeleteUserFromWorkspaceData = HandlersResponseUserInWorkspace

export type DeleteUserFromWorkspaceError = HandlersErrResponse

export interface DeleteVideoQuestionByIdBody {
  id: number
}

export type DeleteVideoQuestionByIdData = HandlersResponseString

export type DeleteVideoQuestionByIdError = HandlersErrResponse

export interface DeleteWorkspaceBody {
  id: number
}

export type DeleteWorkspaceByIdData = HandlersResponseString

export type DeleteWorkspaceByIdError = HandlersErrResponse

export interface DomainsCodingQuestion {
  coding_question_in_portal?: DomainsCodingQuestionInPortal[]
  coding_question_in_workspace?: DomainsCodingQuestionInWorkspace[]
  createdAt?: string
  created_at?: string
  created_by?: string
  deletedAt?: GormDeletedAt
  description?: string
  difficulty?: string
  id?: number
  input_description?: string
  output_description?: string
  test_cases?: DomainsCodingQuestionTestCase[]
  title?: string
  updatedAt?: string
  updated_at?: string
  updated_by?: string
}

export interface DomainsCodingQuestionInPortal {
  codingQuestion?: DomainsCodingQuestion
  codingQuestionID?: number
  createdAt?: string
  deletedAt?: GormDeletedAt
  id?: number
  portal?: DomainsPortal
  portalID?: number
  updatedAt?: string
}

export interface DomainsCodingQuestionInWorkspace {
  codingQuestion?: DomainsCodingQuestion
  codingQuestionID?: number
  createdAt?: string
  deletedAt?: GormDeletedAt
  id?: number
  updatedAt?: string
  workspace?: DomainsWorkspace
  workspaceID?: number
}

export interface DomainsCodingQuestionResponse {
  description?: string
  difficulty?: string
  id?: number
  input_description?: string
  output_description?: string
  test_case?: DomainsCodingQuestionTestCaseResponse[]
  title?: string
}

export interface DomainsCodingQuestionSnapshot {
  code?: string
  coding_question_id?: number
  createdAt?: string
  deletedAt?: GormDeletedAt
  id?: number
  language?: string
  room_id?: string
  updatedAt?: string
}

export interface DomainsCodingQuestionSubmission {
  code?: string
  createdAt?: string
  deletedAt?: GormDeletedAt
  id?: number
  language?: string
  linter_result?: string
  question?: DomainsCodingQuestion
  question_id?: number
  room_id?: string
  test_cases_result?: DomainsCodingQuestionSubmissionTestCaseResult[]
  time_taken?: number
  updatedAt?: string
}

export interface DomainsCodingQuestionSubmissionTestCaseResult {
  compile_result?: string
  createdAt?: string
  deletedAt?: GormDeletedAt
  id?: number
  is_passed?: boolean
  submission?: DomainsCodingQuestionSubmission
  submission_id?: number
  test_case?: DomainsCodingQuestionTestCase
  test_case_id?: number
  updatedAt?: string
}

export interface DomainsCodingQuestionTestCase {
  coding_question_id?: number
  createdAt?: string
  deletedAt?: GormDeletedAt
  id?: number
  input?: string
  is_example?: boolean
  is_hidden?: boolean
  output?: string
  updatedAt?: string
}

export interface DomainsCodingQuestionTestCaseResponse {
  input?: string
  is_example?: boolean
  is_hidden?: boolean
  output?: string
}

export interface DomainsCompilationCompileResult {
  compile_output?: string
  memory?: number
  message?: string
  status?: {
    description?: string
    id?: number
  }
  stderr?: string
  stdout?: string
  time?: string
}

export interface DomainsCompilationRequest {
  language?: number
  question_id?: number
  source_code?: string
}

export interface DomainsCompilationResultResponse {
  compile_result?: DomainsCompilationCompileResult
  is_passed?: boolean
  test_case_id?: number
}

export interface DomainsCreateCodingQuestionRequest {
  description?: string
  difficulty?: string
  input_description?: string
  output_description?: string
  portal_id?: number
  test_cases?: DomainsCodingQuestionTestCase[]
  title?: string
}

export interface DomainsCreateCodingSubmissionRequest {
  code?: string
  language?: string
  question_id?: number
  room_id?: string
  time_taken?: number
}

export interface DomainsPortal {
  companyName?: string
  createdAt?: string
  deletedAt?: GormDeletedAt
  id?: number
  updatedAt?: string
}

export interface DomainsUser {
  createdAt?: string
  deletedAt?: GormDeletedAt
  id?: number
  name?: string
  password?: string
  role?: string
  updatedAt?: string
  username?: string
}

export interface DomainsVideoQuestion {
  createdAt?: string
  deletedAt?: GormDeletedAt
  id?: number
  portalID?: number
  timeToAnswer?: number
  timeToPrepare?: number
  title?: string
  totalAttempt?: number
  updatedAt?: string
  workspace?: DomainsWorkspace[]
}

export interface DomainsWorkspace {
  codingTime?: number
  createdAt?: string
  deletedAt?: GormDeletedAt
  endDate?: string
  id?: number
  isCoding?: boolean
  isVideo?: boolean
  portalId?: number
  reqCamera?: boolean
  reqMicrophone?: boolean
  reqScreen?: boolean
  startDate?: string
  title?: string
  updatedAt?: string
  videoQuestion?: DomainsVideoQuestion[]
  videoTime?: number
}

export interface ExtendRoomSessionBody {
  roomId: string
  sessionIdentifier: string
}

export type ExtendRoomSessionData = HandlersResponseString

export type ExtendRoomSessionError = HandlersErrResponse

export type GetCompileResultData = HandlersResponseHandlersCodingInterviewGetCompileResultResponse

export type GetCompileResultError = HandlersErrResponse

export type GetIndividualUserData = HandlersResponseIndividualUser

export type GetIndividualUserError = HandlersErrResponse

export interface GetIndividualUserParams {
  userId: number
  workspaceId: number
}

export interface GetObjectBody {
  bucketName: string
  objectName: string
}

export type GetObjectData = HandlersResponseString

export type GetObjectError = HandlersErrResponse

export type GetPortalByIdData = HandlersResponsePortalData

export type GetPortalByIdError = HandlersErrResponse

export interface GetPortalByIdParams {
  id: number
}

export type GetPortalWorkspaceData = HandlersResponseArrayWorkspaceDetail

export type GetPortalWorkspaceError = HandlersErrResponse

export type GetQuestionByTitleData = HandlersResponseHandlersCodingInterviewGetQuestionByTitleResponse

export type GetQuestionByTitleError = HandlersErrResponse

export type GetQuestionsData = HandlersResponseHandlersCodingInterviewGetQuestionsResponse

export type GetQuestionsError = HandlersErrResponse

export type GetQuestionsInPortalData = HandlersResponseHandlersCodingInterviewGetQuestionsInPortalResponse

export type GetQuestionsInPortalError = HandlersErrResponse

export type GetQuestionsInWorkspaceData = HandlersResponseHandlersCodingInterviewGetQuestionsInWorkspaceResponse

export type GetQuestionsInWorkspaceError = HandlersErrResponse

export type GetRoomContextData = HandlersResponseGetRoomContextResponse

export type GetRoomContextError = HandlersErrResponse

export interface GetRoomContextParams {
  roomId: string
}

export interface GetRoomContextResponse {
  candidateId: number
  candidateName: string
  dueDate: string
  isCodingDone: boolean
  isOverdue: boolean
  isVideoDone: boolean
  roomId: string
  totalCodingQuestion: number
  totalCodingTime: number
  totalVideoQuestion: number
  totalVideoTime: number
}

export type GetRoomSessionData = HandlersResponseString

export type GetRoomSessionError = HandlersErrResponse

export interface GetRoomSessionParams {
  roomId: string
}

export type GetSubmissionResultByUserData = HandlersResponseHandlersCodingInterviewGetSubmissionResultByUserResponse

export type GetSubmissionResultByUserError = HandlersErrResponse

export type GetUserInWorkspaceData = HandlersResponseArrayUserInWorkspace

export type GetUserInWorkspaceError = HandlersErrResponse

export interface GetUserInWorkspaceParams {
  id: number
}

export type GetVideoInterviewContextData = HandlersResponseVideoInterviewContextResponse

export type GetVideoInterviewContextError = HandlersErrResponse

export interface GetVideoInterviewContextParams {
  roomId: string
}

export type GetVideoInterviewQuestionData = HandlersResponseVideoInterviewQuestionResponse

export type GetVideoInterviewQuestionError = HandlersErrResponse

export interface GetVideoInterviewQuestionParams {
  questionId: number
}

export type GetVideoQuestionByIdData = HandlersResponseGetVideoQuestionByIdResponse

export type GetVideoQuestionByIdError = HandlersErrResponse

export interface GetVideoQuestionByIdParams {
  id: number
}

export interface GetVideoQuestionByIdResponse {
  createdAt?: string
  id?: number
  portalId?: number
  timeToAnswer?: number
  timeToPrepare?: number
  title?: string
  totalAttempt?: number
  updatedAt?: string
}

export type GetVideoQuestionByPortalIdData = HandlersResponseArrayGetVideoQuestionByPortalIdResponse

export type GetVideoQuestionByPortalIdError = HandlersErrResponse

export interface GetVideoQuestionByPortalIdParams {
  id: number
}

export interface GetVideoQuestionByPortalIdResponse {
  createdAt?: string
  id?: number
  portalId?: number
  timeToAnswer?: number
  timeToPrepare?: number
  title?: string
  totalAttempt?: number
  updatedAt?: string
}

export type GetWorkspaceData = HandlersResponseWorkspaceData

export type GetWorkspaceError = HandlersErrResponse

export interface GetWorkspaceParams {
  id: number
}

export interface GormDeletedAt {
  time?: string
  /** Valid is true if Time is not NULL */
  valid?: boolean
}

export interface HandlersCodingInterviewGetQuestionByTitleResponse {
  description?: string
  difficulty?: string
  id?: number
  input_description?: string
  output_description?: string
  test_case?: DomainsCodingQuestionTestCaseResponse[]
  title?: string
}

export interface HandlersCodingInterviewGetSubmissionResultByUserResponse {
  result?: DomainsCodingQuestionSubmission[]
  screen_url?: string
  video_url?: string
}

export interface HandlersErrResponse {
  code?: number
  message?: string
  timestamp?: string
}

export interface HandlersInviteAllCandidateBody {
  workspaceId: number
}

export enum HandlersMailPreset {
  Invite = "invite",
  Finish = "finish",
}

export interface HandlersOkResponse {
  code?: number
  message?: string
  timestamp?: string
}

export interface HandlersResponseArrayGetVideoQuestionByPortalIdResponse {
  code?: number
  data?: GetVideoQuestionByPortalIdResponse[]
  message?: string
  timestamp?: string
}

export interface HandlersResponseArrayUserInWorkspace {
  code?: number
  data?: UserInWorkspace[]
  message?: string
  timestamp?: string
}

export interface HandlersResponseArrayWorkspaceDetail {
  code?: number
  data?: WorkspaceDetail[]
  message?: string
  timestamp?: string
}

export interface HandlersResponseCreateRoomResponse {
  code?: number
  data?: CreateRoomResponse
  message?: string
  timestamp?: string
}

export interface HandlersResponseCreateVideoQuestionResponse {
  code?: number
  data?: CreateVideoQuestionResponse
  message?: string
  timestamp?: string
}

export interface HandlersResponseCurrentUserResponse {
  code?: number
  data?: CurrentUserResponse
  message?: string
  timestamp?: string
}

export interface HandlersResponseDomainsCodingQuestion {
  code?: number
  data?: DomainsCodingQuestion
  message?: string
  timestamp?: string
}

export interface HandlersResponseGetRoomContextResponse {
  code?: number
  data?: GetRoomContextResponse
  message?: string
  timestamp?: string
}

export interface HandlersResponseGetVideoQuestionByIdResponse {
  code?: number
  data?: GetVideoQuestionByIdResponse
  message?: string
  timestamp?: string
}

export interface HandlersResponseHandlersCodingInterviewGetCompileResultResponse {
  code?: number
  data?: DomainsCompilationResultResponse[]
  message?: string
  timestamp?: string
}

export interface HandlersResponseHandlersCodingInterviewGetQuestionByTitleResponse {
  code?: number
  data?: HandlersCodingInterviewGetQuestionByTitleResponse
  message?: string
  timestamp?: string
}

export interface HandlersResponseHandlersCodingInterviewGetQuestionsInPortalResponse {
  code?: number
  data?: DomainsCodingQuestion[]
  message?: string
  timestamp?: string
}

export interface HandlersResponseHandlersCodingInterviewGetQuestionsInWorkspaceResponse {
  code?: number
  data?: DomainsCodingQuestion[]
  message?: string
  timestamp?: string
}

export interface HandlersResponseHandlersCodingInterviewGetQuestionsResponse {
  code?: number
  data?: DomainsCodingQuestionResponse[]
  message?: string
  timestamp?: string
}

export interface HandlersResponseHandlersCodingInterviewGetSubmissionResultByUserResponse {
  code?: number
  data?: HandlersCodingInterviewGetSubmissionResultByUserResponse
  message?: string
  timestamp?: string
}

export interface HandlersResponseIndividualUser {
  code?: number
  data?: IndividualUser
  message?: string
  timestamp?: string
}

export interface HandlersResponsePortalData {
  code?: number
  data?: PortalData
  message?: string
  timestamp?: string
}

export interface HandlersResponseString {
  code?: number
  data?: string
  message?: string
  timestamp?: string
}

export interface HandlersResponseUser {
  code?: number
  data?: User
  message?: string
  timestamp?: string
}

export interface HandlersResponseUserInWorkspace {
  code?: number
  data?: UserInWorkspace
  message?: string
  timestamp?: string
}

export interface HandlersResponseVideoInterviewContextResponse {
  code?: number
  data?: VideoInterviewContextResponse
  message?: string
  timestamp?: string
}

export interface HandlersResponseVideoInterviewQuestionResponse {
  code?: number
  data?: VideoInterviewQuestionResponse
  message?: string
  timestamp?: string
}

export interface HandlersResponseWorkspaceData {
  code?: number
  data?: WorkspaceData
  message?: string
  timestamp?: string
}

export interface HandlersResponseWorkspaceDetail {
  code?: number
  data?: WorkspaceDetail
  message?: string
  timestamp?: string
}

export interface HandlersSetRoomSessionBody {
  roomId: string
  sessionIdentifier: string
}

export interface IndividualUser {
  id: number
  userData: User
  userInWorkspace: UserInWorkspace
}

export type InterestUserData = HandlersResponseUserInWorkspace

export type InterestUserError = HandlersErrResponse

export interface InterestUserParams {
  isInterest: boolean
  userId: number
  workspaceId: number
}

export type InviteAllCandidateData = HandlersResponseString

export type InviteAllCandidateError = HandlersErrResponse

export interface LoginBody {
  password: string
  username: string
}

export type LoginData = HandlersResponseString

export type LoginError = HandlersErrResponse

export type LogoutData = HandlersOkResponse

export interface MailObject {
  dueDate?: string
  name: string
  roomId: string
  to: string
}

export type MeData = HandlersResponseCurrentUserResponse

export interface PortalData {
  companyName?: string
  id?: number
}

export interface RevokeRoomSessionBody {
  roomId: string
}

export type RevokeRoomSessionData = HandlersResponseString

export type RevokeRoomSessionError = HandlersErrResponse

export interface SendMailBody {
  mailList: MailObject[]
  preset: HandlersMailPreset
}

export type SendMailData = HandlersResponseString

export type SendMailError = HandlersErrResponse

export type SetRoomSessionData = HandlersResponseString

export type SetRoomSessionError = HandlersErrResponse

export type SubmitVideoInterviewData = HandlersResponseString

export type SubmitVideoInterviewError = HandlersErrResponse

export interface SubmitVideoInterviewPayload {
  /** Candidate ID */
  candidateId: number
  /**
   * Video Interview File
   * @format binary
   */
  file: File
  /** Room ID */
  roomId: string
  /** Video Question ID */
  videoQuestionId: number
}

export type UpdateQuestionData = HandlersResponseDomainsCodingQuestion

export type UpdateQuestionError = HandlersErrResponse

export interface UpdateRoomContextBody {
  candidateId?: number
  isCodingDone?: boolean
  isVideoDone?: boolean
  roomId: string
}

export type UpdateRoomContextData = HandlersResponseString

export type UpdateRoomContextError = HandlersErrResponse

export interface UpdateVideoQuestionBody {
  portalId?: number
  questionId: number
  timeToAnswer?: number
  timeToPrepare?: number
  title?: string
  totalAttempt?: number
}

export type UpdateVideoQuestionData = HandlersResponseCreateVideoQuestionResponse

export type UpdateVideoQuestionError = HandlersErrResponse

export type UploadObjectData = HandlersResponseString

export type UploadObjectError = HandlersErrResponse

export interface UploadObjectPayload {
  /** Bucket Name */
  bucketName: string
  /**
   * Video Interview File
   * @format binary
   */
  file: File
}

export type UploadVideoData = HandlersResponseString

export type UploadVideoError = HandlersErrResponse

export interface UploadVideoPayload {
  /** Room ID */
  roomID: string
  /**
   * Coding Interview Screen File
   * @format binary
   */
  screenFile: File
  /**
   * Coding Interview Video File
   * @format binary
   */
  videoFile: File
}

export interface User {
  created_at?: string
  id?: number
  name?: string
  role?: string
  updated_at?: string
  username?: string
}

export interface UserCreateBody {
  listUser: DomainsUser[]
  workspaceId: number
}

export interface UserDeleteBody {
  id: number
}

export interface UserInWorkspace {
  id: number
  isInterest: boolean
  status: string
  userId: number
  workspaceId: number
}

export interface VideoInterviewContextResponse {
  questionSetting: VideoInterviewQuestionSetting[]
  totalQuestions: number
}

export interface VideoInterviewQuestionResponse {
  question: string
  questionId: number
}

export interface VideoInterviewQuestionSetting {
  isLast: boolean
  questionId: number
  questionIndex: number
  timeToAnswer: number
  timeToPrepare: number
  totalAttempt: number
}

export interface VideoQuestionDetail {
  id: number
  portalId: number
  timeToAnswer: number
  timeToPrepare: number
  title: string
  totalAttempt: number
}

export interface WorkspaceData {
  individualUser: IndividualUser[]
  workspaceDetail: WorkspaceDetail
}

export interface WorkspaceDetail {
  codingTime?: number
  createAt?: string
  endDate?: string
  id?: number
  isCoding?: boolean
  isVideo?: boolean
  memberNum?: number
  portalId?: number
  reqCamera?: boolean
  reqMicrophone?: boolean
  reqScreen?: boolean
  startDate?: string
  title?: string
  videoQueston?: VideoQuestionDetail[]
  videoTime?: number
}

export namespace Authentication {
  /**
   * No description
   * @tags authentication
   * @name Login
   * @summary Login to the system
   * @request POST:/auth.login
   * @response `200` `LoginData` OK
   * @response `400` `HandlersErrResponse` Bad Request
   * @response `500` `HandlersErrResponse` Internal Server Error
   */
  export namespace Login {
    export type RequestParams = {}
    export type RequestQuery = {}
    export type RequestBody = LoginBody
    export type RequestHeaders = {}
    export type ResponseBody = LoginData
  }

  /**
   * No description
   * @tags authentication
   * @name Logout
   * @summary Logout from the system
   * @request POST:/auth.logout
   * @response `200` `LogoutData` OK
   */
  export namespace Logout {
    export type RequestParams = {}
    export type RequestQuery = {}
    export type RequestBody = never
    export type RequestHeaders = {}
    export type ResponseBody = LogoutData
  }

  /**
   * No description
   * @tags authentication
   * @name Me
   * @summary Get current user in the system
   * @request GET:/auth.me
   * @response `200` `MeData` OK
   */
  export namespace Me {
    export type RequestParams = {}
    export type RequestQuery = {}
    export type RequestBody = never
    export type RequestHeaders = {}
    export type ResponseBody = MeData
  }
}

export namespace CodingInterview {
  /**
   * @description Add a coding interview question to a target
   * @tags codingInterview
   * @name AddQuestion
   * @summary Add a coding interview question to a target
   * @request POST:/codingInterview.addQuestion
   * @response `200` `AddQuestionData` Successful response with a message
   * @response `400` `HandlersErrResponse` Bad Request
   * @response `500` `HandlersErrResponse` Internal Server Error
   */
  export namespace AddQuestion {
    export type RequestParams = {}
    export type RequestQuery = {}
    export type RequestBody = CodingInterviewAddQuestionQuery
    export type RequestHeaders = {}
    export type ResponseBody = AddQuestionData
  }

  /**
   * @description Create a new coding interview question submission
   * @tags codingInterview
   * @name CreateCodingSubmission
   * @summary Create a new coding interview question submission
   * @request POST:/codingInterview.createCodingSubmission
   * @response `200` `CreateCodingSubmissionData` Successful response with a message
   * @response `400` `HandlersErrResponse` Bad Request
   * @response `500` `HandlersErrResponse` Internal Server Error
   */
  export namespace CreateCodingSubmission {
    export type RequestParams = {}
    export type RequestQuery = {}
    export type RequestBody = CreateCodingSubmissionPayload
    export type RequestHeaders = {}
    export type ResponseBody = CreateCodingSubmissionData
  }

  /**
   * @description Create a new coding interview question
   * @tags codingInterview
   * @name CreateQuestion
   * @summary Create a new coding interview question
   * @request POST:/codingInterview.createQuestion
   * @response `200` `CreateQuestionData` Successful response with the created question
   * @response `400` `HandlersErrResponse` Bad Request
   * @response `500` `HandlersErrResponse` Internal Server Error
   */
  export namespace CreateQuestion {
    export type RequestParams = {}
    export type RequestQuery = {}
    export type RequestBody = CodingInterviewCreateQuestionQuery
    export type RequestHeaders = {}
    export type ResponseBody = CreateQuestionData
  }

  /**
   * @description Create a new coding interview question snapshot
   * @tags codingInterview
   * @name CreateQuestionSnapshot
   * @summary Create a new coding interview question snapshot
   * @request POST:/codingInterview.createQuestionSnapshot
   * @response `200` `CreateQuestionSnapshotData` Successful response with a message
   * @response `400` `HandlersErrResponse` Bad Request
   * @response `500` `HandlersErrResponse` Internal Server Error
   */
  export namespace CreateQuestionSnapshot {
    export type RequestParams = {}
    export type RequestQuery = {}
    export type RequestBody = CreateQuestionSnapshotPayload
    export type RequestHeaders = {}
    export type ResponseBody = CreateQuestionSnapshotData
  }

  /**
   * @description Delete a coding interview question
   * @tags codingInterview
   * @name DeleteQuestion
   * @summary Delete a coding interview question
   * @request DELETE:/codingInterview.deleteQuestion/{codingQuestionID}
   * @response `200` `DeleteQuestionData` Successful response with a message
   * @response `400` `HandlersErrResponse` Bad Request
   * @response `500` `HandlersErrResponse` Internal Server Error
   */
  export namespace DeleteQuestion {
    export type RequestParams = {
      /** Coding Question ID */
      codingQuestionId: number
    }
    export type RequestQuery = {}
    export type RequestBody = never
    export type RequestHeaders = {}
    export type ResponseBody = DeleteQuestionData
  }

  /**
   * @description Get compile result for a coding interview
   * @tags codingInterview
   * @name GetCompileResult
   * @summary Get compile result for a coding interview
   * @request POST:/codingInterview.getCompileResult
   * @response `200` `GetCompileResultData` Successful response with the compile result
   * @response `400` `HandlersErrResponse` Bad Request
   * @response `500` `HandlersErrResponse` Internal Server Error
   */
  export namespace GetCompileResult {
    export type RequestParams = {}
    export type RequestQuery = {}
    export type RequestBody = CodingInterviewGetCompileResultQuery
    export type RequestHeaders = {}
    export type ResponseBody = GetCompileResultData
  }

  /**
   * @description Get coding interview question by title
   * @tags codingInterview
   * @name GetQuestionByTitle
   * @summary Get coding interview question by title
   * @request GET:/codingInterview.getQuestionByTitle/{title}
   * @response `200` `GetQuestionByTitleData` Successful response with the coding interview question by title
   * @response `400` `HandlersErrResponse` Bad Request
   * @response `500` `HandlersErrResponse` Internal Server Error
   */
  export namespace GetQuestionByTitle {
    export type RequestParams = {
      /** Question Title */
      title: string
    }
    export type RequestQuery = {}
    export type RequestBody = never
    export type RequestHeaders = {}
    export type ResponseBody = GetQuestionByTitleData
  }

  /**
   * @description Get coding interview questions
   * @tags codingInterview
   * @name GetQuestions
   * @summary Get coding interview questions
   * @request GET:/codingInterview.getQuestions
   * @response `200` `GetQuestionsData` Successful response with the coding interview questions
   * @response `400` `HandlersErrResponse` Bad Request
   * @response `500` `HandlersErrResponse` Internal Server Error
   */
  export namespace GetQuestions {
    export type RequestParams = {}
    export type RequestQuery = {}
    export type RequestBody = never
    export type RequestHeaders = {}
    export type ResponseBody = GetQuestionsData
  }

  /**
   * @description Get coding interview questions in a portal
   * @tags codingInterview
   * @name GetQuestionsInPortal
   * @summary Get coding interview questions in a portal
   * @request GET:/codingInterview.getQuestionsInPortal/{portalId}
   * @response `200` `GetQuestionsInPortalData` Successful response with the coding interview questions in a portal
   * @response `400` `HandlersErrResponse` Bad Request
   * @response `500` `HandlersErrResponse` Internal Server Error
   */
  export namespace GetQuestionsInPortal {
    export type RequestParams = {
      /** Portal ID */
      portalId: number
    }
    export type RequestQuery = {}
    export type RequestBody = never
    export type RequestHeaders = {}
    export type ResponseBody = GetQuestionsInPortalData
  }

  /**
   * @description Get coding interview questions in a workspace
   * @tags codingInterview
   * @name GetQuestionsInWorkspace
   * @summary Get coding interview questions in a workspace
   * @request GET:/codingInterview.getQuestionsInWorkspace/{workspaceId}
   * @response `200` `GetQuestionsInWorkspaceData` Successful response with the coding interview questions in a workspace
   * @response `400` `HandlersErrResponse` Bad Request
   * @response `500` `HandlersErrResponse` Internal Server Error
   */
  export namespace GetQuestionsInWorkspace {
    export type RequestParams = {
      /** Workspace ID */
      workspaceId: number
    }
    export type RequestQuery = {}
    export type RequestBody = never
    export type RequestHeaders = {}
    export type ResponseBody = GetQuestionsInWorkspaceData
  }

  /**
   * @description Get coding interview submission result by user
   * @tags codingInterview
   * @name GetSubmissionResultByUser
   * @summary Get coding interview submission result by user
   * @request POST:/codingInterview.getSubmissionResultByUser
   * @response `200` `GetSubmissionResultByUserData` Successful response with the coding interview submission result by user
   * @response `400` `HandlersErrResponse` Bad Request
   * @response `500` `HandlersErrResponse` Internal Server Error
   */
  export namespace GetSubmissionResultByUser {
    export type RequestParams = {}
    export type RequestQuery = {}
    export type RequestBody = CodingInterviewGetSubmissionResultByUserQuery
    export type RequestHeaders = {}
    export type ResponseBody = GetSubmissionResultByUserData
  }

  /**
   * @description Update a coding interview question
   * @tags codingInterview
   * @name UpdateQuestion
   * @summary Update a coding interview question
   * @request PUT:/codingInterview.updateQuestion/{codingQuestionID}
   * @response `200` `UpdateQuestionData` Successful response with the updated question
   * @response `400` `HandlersErrResponse` Bad Request
   * @response `500` `HandlersErrResponse` Internal Server Error
   */
  export namespace UpdateQuestion {
    export type RequestParams = {
      /** Coding Question ID */
      codingQuestionId: number
    }
    export type RequestQuery = {}
    export type RequestBody = CodingInterviewUpdateQuestionQuery
    export type RequestHeaders = {}
    export type ResponseBody = UpdateQuestionData
  }

  /**
   * @description Upload a coding interview video
   * @tags codingInterview
   * @name UploadVideo
   * @summary Upload a coding interview video
   * @request POST:/codingInterview.uploadVideo
   * @response `200` `UploadVideoData` Successful response with a message
   * @response `400` `HandlersErrResponse` Bad Request
   * @response `500` `HandlersErrResponse` Internal Server Error
   */
  export namespace UploadVideo {
    export type RequestParams = {}
    export type RequestQuery = {}
    export type RequestBody = UploadVideoPayload
    export type RequestHeaders = {}
    export type ResponseBody = UploadVideoData
  }
}

export namespace Mail {
  /**
   * No description
   * @tags mail
   * @name SendMail
   * @summary Send mail to the user
   * @request POST:/mail.sendMail
   * @response `200` `SendMailData` OK
   * @response `400` `HandlersErrResponse` Bad Request
   * @response `500` `HandlersErrResponse` Internal Server Error
   */
  export namespace SendMail {
    export type RequestParams = {}
    export type RequestQuery = {}
    export type RequestBody = SendMailBody
    export type RequestHeaders = {}
    export type ResponseBody = SendMailData
  }
}

export namespace Object {
  /**
   * No description
   * @tags object
   * @name GetObject
   * @summary Get object from the system
   * @request POST:/object.getObject
   * @response `200` `GetObjectData` OK
   * @response `400` `HandlersErrResponse` Bad Request
   * @response `500` `HandlersErrResponse` Internal Server Error
   */
  export namespace GetObject {
    export type RequestParams = {}
    export type RequestQuery = {}
    export type RequestBody = GetObjectBody
    export type RequestHeaders = {}
    export type ResponseBody = GetObjectData
  }

  /**
   * No description
   * @tags object
   * @name UploadObject
   * @summary Upload object to the system
   * @request POST:/object.uploadObject
   * @response `200` `UploadObjectData` OK
   * @response `400` `HandlersErrResponse` Bad Request
   * @response `500` `HandlersErrResponse` Internal Server Error
   */
  export namespace UploadObject {
    export type RequestParams = {}
    export type RequestQuery = {}
    export type RequestBody = UploadObjectPayload
    export type RequestHeaders = {}
    export type ResponseBody = UploadObjectData
  }
}

export namespace Portal {
  /**
   * No description
   * @tags portal
   * @name CreatePortal
   * @summary Create new portal
   * @request POST:/portal.create
   * @response `200` `CreatePortalData` OK
   * @response `400` `HandlersErrResponse` Bad Request
   * @response `500` `HandlersErrResponse` Internal Server Error
   */
  export namespace CreatePortal {
    export type RequestParams = {}
    export type RequestQuery = {}
    export type RequestBody = CreatePortalBody
    export type RequestHeaders = {}
    export type ResponseBody = CreatePortalData
  }

  /**
   * No description
   * @tags portal
   * @name DeletePortalById
   * @summary Delete portal By Id
   * @request POST:/portal.delete
   * @response `200` `DeletePortalByIdData` OK
   * @response `400` `HandlersErrResponse` Bad Request
   * @response `500` `HandlersErrResponse` Internal Server Error
   */
  export namespace DeletePortalById {
    export type RequestParams = {}
    export type RequestQuery = {}
    export type RequestBody = DeletePortalBody
    export type RequestHeaders = {}
    export type ResponseBody = DeletePortalByIdData
  }

  /**
   * No description
   * @tags portal
   * @name GetPortalById
   * @summary Get portal
   * @request GET:/portal.get
   * @response `200` `GetPortalByIdData` OK
   * @response `400` `HandlersErrResponse` Bad Request
   * @response `500` `HandlersErrResponse` Internal Server Error
   */
  export namespace GetPortalById {
    export type RequestParams = {}
    export type RequestQuery = {
      id: number
    }
    export type RequestBody = never
    export type RequestHeaders = {}
    export type ResponseBody = GetPortalByIdData
  }
}

export namespace Room {
  /**
   * No description
   * @tags room
   * @name CreateRoom
   * @summary Create room
   * @request POST:/room.createRoom
   * @response `200` `CreateRoomData` OK
   * @response `400` `HandlersErrResponse` Bad Request
   * @response `500` `HandlersErrResponse` Internal Server Error
   */
  export namespace CreateRoom {
    export type RequestParams = {}
    export type RequestQuery = {}
    export type RequestBody = CreateRoomBody
    export type RequestHeaders = {}
    export type ResponseBody = CreateRoomData
  }

  /**
   * No description
   * @tags room
   * @name ExtendRoomSession
   * @summary Extend room session
   * @request POST:/room.extendRoomSession
   * @response `200` `ExtendRoomSessionData` OK
   * @response `400` `HandlersErrResponse` Bad Request
   * @response `500` `HandlersErrResponse` Internal Server Error
   */
  export namespace ExtendRoomSession {
    export type RequestParams = {}
    export type RequestQuery = {}
    export type RequestBody = ExtendRoomSessionBody
    export type RequestHeaders = {}
    export type ResponseBody = ExtendRoomSessionData
  }

  /**
   * No description
   * @tags room
   * @name GetRoomContext
   * @summary Get room context
   * @request GET:/room.getRoomContext
   * @response `200` `GetRoomContextData` OK
   * @response `400` `HandlersErrResponse` Bad Request
   * @response `500` `HandlersErrResponse` Internal Server Error
   */
  export namespace GetRoomContext {
    export type RequestParams = {}
    export type RequestQuery = {
      roomId: string
    }
    export type RequestBody = never
    export type RequestHeaders = {}
    export type ResponseBody = GetRoomContextData
  }

  /**
   * No description
   * @tags room
   * @name GetRoomSession
   * @summary Get room session
   * @request GET:/room.getRoomSession
   * @response `200` `GetRoomSessionData` OK
   * @response `400` `HandlersErrResponse` Bad Request
   * @response `500` `HandlersErrResponse` Internal Server Error
   */
  export namespace GetRoomSession {
    export type RequestParams = {}
    export type RequestQuery = {
      roomId: string
    }
    export type RequestBody = never
    export type RequestHeaders = {}
    export type ResponseBody = GetRoomSessionData
  }

  /**
   * No description
   * @tags room
   * @name RevokeRoomSession
   * @summary Revoke room session
   * @request POST:/room.revokeRoomSession
   * @response `200` `RevokeRoomSessionData` OK
   * @response `400` `HandlersErrResponse` Bad Request
   * @response `500` `HandlersErrResponse` Internal Server Error
   */
  export namespace RevokeRoomSession {
    export type RequestParams = {}
    export type RequestQuery = {}
    export type RequestBody = RevokeRoomSessionBody
    export type RequestHeaders = {}
    export type ResponseBody = RevokeRoomSessionData
  }

  /**
   * No description
   * @tags room
   * @name SetRoomSession
   * @summary Set room session
   * @request POST:/room.setRoomSession
   * @response `200` `SetRoomSessionData` OK
   * @response `400` `HandlersErrResponse` Bad Request
   * @response `500` `HandlersErrResponse` Internal Server Error
   */
  export namespace SetRoomSession {
    export type RequestParams = {}
    export type RequestQuery = {}
    export type RequestBody = HandlersSetRoomSessionBody
    export type RequestHeaders = {}
    export type ResponseBody = SetRoomSessionData
  }

  /**
   * No description
   * @tags room
   * @name UpdateRoomContext
   * @summary Update room context
   * @request POST:/room.updateRoomContext
   * @response `200` `UpdateRoomContextData` OK
   * @response `400` `HandlersErrResponse` Bad Request
   * @response `500` `HandlersErrResponse` Internal Server Error
   */
  export namespace UpdateRoomContext {
    export type RequestParams = {}
    export type RequestQuery = {}
    export type RequestBody = UpdateRoomContextBody
    export type RequestHeaders = {}
    export type ResponseBody = UpdateRoomContextData
  }
}

export namespace User {
  /**
   * No description
   * @tags user
   * @name CreateAdmin
   * @summary Create new admin
   * @request POST:/user.createAdmin
   * @response `200` `CreateAdminData` OK
   * @response `400` `HandlersErrResponse` Bad Request
   * @response `500` `HandlersErrResponse` Internal Server Error
   */
  export namespace CreateAdmin {
    export type RequestParams = {}
    export type RequestQuery = {}
    export type RequestBody = AdminCreateBody
    export type RequestHeaders = {}
    export type ResponseBody = CreateAdminData
  }

  /**
   * No description
   * @tags user
   * @name CreateUser
   * @summary Create new user
   * @request POST:/user.createUser
   * @response `200` `CreateUserData` OK
   * @response `400` `HandlersErrResponse` Bad Request
   * @response `500` `HandlersErrResponse` Internal Server Error
   */
  export namespace CreateUser {
    export type RequestParams = {}
    export type RequestQuery = {}
    export type RequestBody = UserCreateBody
    export type RequestHeaders = {}
    export type ResponseBody = CreateUserData
  }

  /**
   * No description
   * @tags user
   * @name DeleteUser
   * @summary Delete user
   * @request POST:/user.deleteUser
   * @response `200` `DeleteUserData` OK
   * @response `400` `HandlersErrResponse` Bad Request
   * @response `500` `HandlersErrResponse` Internal Server Error
   */
  export namespace DeleteUser {
    export type RequestParams = {}
    export type RequestQuery = {}
    export type RequestBody = UserDeleteBody
    export type RequestHeaders = {}
    export type ResponseBody = DeleteUserData
  }
}

export namespace UserInWorkspace {
  /**
   * No description
   * @tags userInWorkspace
   * @name DeleteUserFromWorkspace
   * @summary Delete User From Workspace
   * @request DELETE:/userInWorkspace.delete
   * @response `200` `DeleteUserFromWorkspaceData` OK
   * @response `400` `HandlersErrResponse` Bad Request
   * @response `500` `HandlersErrResponse` Internal Server Error
   */
  export namespace DeleteUserFromWorkspace {
    export type RequestParams = {}
    export type RequestQuery = {}
    export type RequestBody = DeleteUserFromWorkspaceBody
    export type RequestHeaders = {}
    export type ResponseBody = DeleteUserFromWorkspaceData
  }

  /**
   * No description
   * @tags userInWorkspace
   * @name GetIndividualUser
   * @summary Get Individual User In Workspace
   * @request GET:/userInWorkspace.getbyId
   * @response `200` `GetIndividualUserData` OK
   * @response `400` `HandlersErrResponse` Bad Request
   * @response `500` `HandlersErrResponse` Internal Server Error
   */
  export namespace GetIndividualUser {
    export type RequestParams = {}
    export type RequestQuery = {
      userId: number
      workspaceId: number
    }
    export type RequestBody = never
    export type RequestHeaders = {}
    export type ResponseBody = GetIndividualUserData
  }

  /**
   * No description
   * @tags userInWorkspace
   * @name GetUserInWorkspace
   * @summary Get user In Workspace
   * @request GET:/userInWorkspace.get
   * @response `200` `GetUserInWorkspaceData` OK
   * @response `400` `HandlersErrResponse` Bad Request
   * @response `500` `HandlersErrResponse` Internal Server Error
   */
  export namespace GetUserInWorkspace {
    export type RequestParams = {}
    export type RequestQuery = {
      id: number
    }
    export type RequestBody = never
    export type RequestHeaders = {}
    export type ResponseBody = GetUserInWorkspaceData
  }

  /**
   * No description
   * @tags userInWorkspace
   * @name InterestUser
   * @summary Interest User In Workspace
   * @request PATCH:/userInWorkspace.interest
   * @response `200` `InterestUserData` OK
   * @response `400` `HandlersErrResponse` Bad Request
   * @response `500` `HandlersErrResponse` Internal Server Error
   */
  export namespace InterestUser {
    export type RequestParams = {}
    export type RequestQuery = {
      isInterest: boolean
      userId: number
      workspaceId: number
    }
    export type RequestBody = never
    export type RequestHeaders = {}
    export type ResponseBody = InterestUserData
  }
}

export namespace VideoInterview {
  /**
   * No description
   * @tags videoInterview
   * @name GetVideoInterviewContext
   * @summary Get video interview context
   * @request GET:/videoInterview.getVideoInterviewContext
   * @response `200` `GetVideoInterviewContextData` OK
   * @response `400` `HandlersErrResponse` Bad Request
   * @response `500` `HandlersErrResponse` Internal Server Error
   */
  export namespace GetVideoInterviewContext {
    export type RequestParams = {}
    export type RequestQuery = {
      roomId: string
    }
    export type RequestBody = never
    export type RequestHeaders = {}
    export type ResponseBody = GetVideoInterviewContextData
  }

  /**
   * No description
   * @tags videoInterview
   * @name GetVideoInterviewQuestion
   * @summary Get video interview question
   * @request GET:/videoInterview.getVideoInterviewQuestion
   * @response `200` `GetVideoInterviewQuestionData` OK
   * @response `400` `HandlersErrResponse` Bad Request
   * @response `500` `HandlersErrResponse` Internal Server Error
   */
  export namespace GetVideoInterviewQuestion {
    export type RequestParams = {}
    export type RequestQuery = {
      questionId: number
    }
    export type RequestBody = never
    export type RequestHeaders = {}
    export type ResponseBody = GetVideoInterviewQuestionData
  }

  /**
   * No description
   * @tags videoInterview
   * @name SubmitVideoInterview
   * @summary Submit video interview
   * @request POST:/videoInterview.submitVideoInterview
   * @response `200` `SubmitVideoInterviewData` OK
   * @response `400` `HandlersErrResponse` Bad Request
   * @response `500` `HandlersErrResponse` Internal Server Error
   */
  export namespace SubmitVideoInterview {
    export type RequestParams = {}
    export type RequestQuery = {}
    export type RequestBody = SubmitVideoInterviewPayload
    export type RequestHeaders = {}
    export type ResponseBody = SubmitVideoInterviewData
  }
}

export namespace VideoQuestion {
  /**
   * No description
   * @tags videoQuestion
   * @name CreateVideoQuestion
   * @summary Create new video question
   * @request POST:/videoQuestion.createVideoQuestion
   * @response `200` `CreateVideoQuestionData` OK
   * @response `400` `HandlersErrResponse` Bad Request
   * @response `500` `HandlersErrResponse` Internal Server Error
   */
  export namespace CreateVideoQuestion {
    export type RequestParams = {}
    export type RequestQuery = {}
    export type RequestBody = CreateVideoQuestionBody
    export type RequestHeaders = {}
    export type ResponseBody = CreateVideoQuestionData
  }

  /**
   * No description
   * @tags videoQuestion
   * @name DeleteVideoQuestionById
   * @summary Delete video question by id
   * @request POST:/videoQuestion.deleteVideoQuestionById
   * @response `200` `DeleteVideoQuestionByIdData` OK
   * @response `400` `HandlersErrResponse` Bad Request
   * @response `404` `HandlersErrResponse` Not Found
   * @response `500` `HandlersErrResponse` Internal Server Error
   */
  export namespace DeleteVideoQuestionById {
    export type RequestParams = {}
    export type RequestQuery = {}
    export type RequestBody = DeleteVideoQuestionByIdBody
    export type RequestHeaders = {}
    export type ResponseBody = DeleteVideoQuestionByIdData
  }

  /**
   * No description
   * @tags videoQuestion
   * @name GetVideoQuestionById
   * @summary Get video question by id
   * @request GET:/videoQuestion.getVideoQuestionById
   * @response `200` `GetVideoQuestionByIdData` OK
   * @response `400` `HandlersErrResponse` Bad Request
   * @response `404` `HandlersErrResponse` Not Found
   * @response `500` `HandlersErrResponse` Internal Server Error
   */
  export namespace GetVideoQuestionById {
    export type RequestParams = {}
    export type RequestQuery = {
      id: number
    }
    export type RequestBody = never
    export type RequestHeaders = {}
    export type ResponseBody = GetVideoQuestionByIdData
  }

  /**
   * No description
   * @tags videoQuestion
   * @name GetVideoQuestionByPortalId
   * @summary Get video question by portal id
   * @request GET:/videoQuestion.getVideoQuestionByPortalId
   * @response `200` `GetVideoQuestionByPortalIdData` OK
   * @response `400` `HandlersErrResponse` Bad Request
   * @response `404` `HandlersErrResponse` Not Found
   * @response `500` `HandlersErrResponse` Internal Server Error
   */
  export namespace GetVideoQuestionByPortalId {
    export type RequestParams = {}
    export type RequestQuery = {
      id: number
    }
    export type RequestBody = never
    export type RequestHeaders = {}
    export type ResponseBody = GetVideoQuestionByPortalIdData
  }

  /**
   * No description
   * @tags videoQuestion
   * @name UpdateVideoQuestion
   * @summary Update video question
   * @request POST:/videoQuestion.updateVideoQuestion
   * @response `200` `UpdateVideoQuestionData` OK
   * @response `400` `HandlersErrResponse` Bad Request
   * @response `404` `HandlersErrResponse` Not Found
   * @response `500` `HandlersErrResponse` Internal Server Error
   */
  export namespace UpdateVideoQuestion {
    export type RequestParams = {}
    export type RequestQuery = {}
    export type RequestBody = UpdateVideoQuestionBody
    export type RequestHeaders = {}
    export type ResponseBody = UpdateVideoQuestionData
  }
}

export namespace Workspace {
  /**
   * No description
   * @tags workspace
   * @name CreateWorkspace
   * @summary Create new workspace
   * @request POST:/workspace.create
   * @response `200` `CreateWorkspaceData` OK
   * @response `400` `HandlersErrResponse` Bad Request
   * @response `500` `HandlersErrResponse` Internal Server Error
   */
  export namespace CreateWorkspace {
    export type RequestParams = {}
    export type RequestQuery = {}
    export type RequestBody = CreateWorkspaceBody
    export type RequestHeaders = {}
    export type ResponseBody = CreateWorkspaceData
  }

  /**
   * No description
   * @tags workspace
   * @name DeleteWorkspaceById
   * @summary Delete workspace By Id
   * @request POST:/workspace.delete
   * @response `200` `DeleteWorkspaceByIdData` OK
   * @response `400` `HandlersErrResponse` Bad Request
   * @response `500` `HandlersErrResponse` Internal Server Error
   */
  export namespace DeleteWorkspaceById {
    export type RequestParams = {}
    export type RequestQuery = {}
    export type RequestBody = DeleteWorkspaceBody
    export type RequestHeaders = {}
    export type ResponseBody = DeleteWorkspaceByIdData
  }

  /**
   * No description
   * @tags workspace
   * @name GetPortalWorkspace
   * @summary Get List of workspace
   * @request GET:/workspace.getByPortal
   * @response `200` `GetPortalWorkspaceData` OK
   * @response `400` `HandlersErrResponse` Bad Request
   * @response `500` `HandlersErrResponse` Internal Server Error
   */
  export namespace GetPortalWorkspace {
    export type RequestParams = {}
    export type RequestQuery = {}
    export type RequestBody = never
    export type RequestHeaders = {}
    export type ResponseBody = GetPortalWorkspaceData
  }

  /**
   * No description
   * @tags workspace
   * @name GetWorkspace
   * @summary Get workspace
   * @request GET:/workspace.get
   * @response `200` `GetWorkspaceData` OK
   * @response `400` `HandlersErrResponse` Bad Request
   * @response `500` `HandlersErrResponse` Internal Server Error
   */
  export namespace GetWorkspace {
    export type RequestParams = {}
    export type RequestQuery = {
      id: number
    }
    export type RequestBody = never
    export type RequestHeaders = {}
    export type ResponseBody = GetWorkspaceData
  }

  /**
   * No description
   * @tags workspace
   * @name InviteAllCandidate
   * @request POST:/workspace.inviteAllCandidate
   * @response `200` `InviteAllCandidateData` OK
   * @response `400` `HandlersErrResponse` Bad Request
   * @response `500` `HandlersErrResponse` Internal Server Error
   */
  export namespace InviteAllCandidate {
    export type RequestParams = {}
    export type RequestQuery = {}
    export type RequestBody = HandlersInviteAllCandidateBody
    export type RequestHeaders = {}
    export type ResponseBody = InviteAllCandidateData
  }
}

import type { AxiosInstance, AxiosRequestConfig, HeadersDefaults, ResponseType } from "axios"
import axios from "axios"

export type QueryParamsType = Record<string | number, any>

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean
  /** request path */
  path: string
  /** content type of request body */
  type?: ContentType
  /** query params */
  query?: QueryParamsType
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType
  /** request body */
  body?: unknown
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void
  secure?: boolean
  format?: ResponseType
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance
  private securityData: SecurityDataType | null = null
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"]
  private secure?: boolean
  private format?: ResponseType

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "/api" })
    this.secure = secure
    this.format = format
    this.securityWorker = securityWorker
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data
  }

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method)

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    }
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem)
    } else {
      return `${formItem}`
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key]
      const propertyContent: any[] = property instanceof Array ? property : [property]

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem))
      }

      return formData
    }, new FormData())
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<T> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {}
    const requestParams = this.mergeRequestParams(params, secureParams)
    const responseFormat = format || this.format || undefined

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      body = this.createFormData(body as Record<string, unknown>)
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== "string") {
      body = JSON.stringify(body)
    }

    return this.instance
      .request({
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type ? { "Content-Type": type } : {}),
        },
        params: query,
        responseType: responseFormat,
        data: body,
        url: path,
      })
      .then((response) => response.data)
  }
}

/**
 * @title Interv API
 * @version 1.0
 * @baseUrl /api
 * @contact
 */
export class Server<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  authentication = {
    /**
     * No description
     *
     * @tags authentication
     * @name Login
     * @summary Login to the system
     * @request POST:/auth.login
     * @response `200` `LoginData` OK
     * @response `400` `HandlersErrResponse` Bad Request
     * @response `500` `HandlersErrResponse` Internal Server Error
     */
    login: (payload: LoginBody, params: RequestParams = {}) =>
      this.request<LoginData, LoginError>({
        path: `/auth.login`,
        method: "POST",
        body: payload,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags authentication
     * @name Logout
     * @summary Logout from the system
     * @request POST:/auth.logout
     * @response `200` `LogoutData` OK
     */
    logout: (params: RequestParams = {}) =>
      this.request<LogoutData, any>({
        path: `/auth.logout`,
        method: "POST",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags authentication
     * @name Me
     * @summary Get current user in the system
     * @request GET:/auth.me
     * @response `200` `MeData` OK
     */
    me: (params: RequestParams = {}) =>
      this.request<MeData, any>({
        path: `/auth.me`,
        method: "GET",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  }
  codingInterview = {
    /**
     * @description Add a coding interview question to a target
     *
     * @tags codingInterview
     * @name AddQuestion
     * @summary Add a coding interview question to a target
     * @request POST:/codingInterview.addQuestion
     * @response `200` `AddQuestionData` Successful response with a message
     * @response `400` `HandlersErrResponse` Bad Request
     * @response `500` `HandlersErrResponse` Internal Server Error
     */
    addQuestion: (body: CodingInterviewAddQuestionQuery, params: RequestParams = {}) =>
      this.request<AddQuestionData, AddQuestionError>({
        path: `/codingInterview.addQuestion`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Create a new coding interview question submission
     *
     * @tags codingInterview
     * @name CreateCodingSubmission
     * @summary Create a new coding interview question submission
     * @request POST:/codingInterview.createCodingSubmission
     * @response `200` `CreateCodingSubmissionData` Successful response with a message
     * @response `400` `HandlersErrResponse` Bad Request
     * @response `500` `HandlersErrResponse` Internal Server Error
     */
    createCodingSubmission: (body: CreateCodingSubmissionPayload, params: RequestParams = {}) =>
      this.request<CreateCodingSubmissionData, CreateCodingSubmissionError>({
        path: `/codingInterview.createCodingSubmission`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Create a new coding interview question
     *
     * @tags codingInterview
     * @name CreateQuestion
     * @summary Create a new coding interview question
     * @request POST:/codingInterview.createQuestion
     * @response `200` `CreateQuestionData` Successful response with the created question
     * @response `400` `HandlersErrResponse` Bad Request
     * @response `500` `HandlersErrResponse` Internal Server Error
     */
    createQuestion: (body: CodingInterviewCreateQuestionQuery, params: RequestParams = {}) =>
      this.request<CreateQuestionData, CreateQuestionError>({
        path: `/codingInterview.createQuestion`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Create a new coding interview question snapshot
     *
     * @tags codingInterview
     * @name CreateQuestionSnapshot
     * @summary Create a new coding interview question snapshot
     * @request POST:/codingInterview.createQuestionSnapshot
     * @response `200` `CreateQuestionSnapshotData` Successful response with a message
     * @response `400` `HandlersErrResponse` Bad Request
     * @response `500` `HandlersErrResponse` Internal Server Error
     */
    createQuestionSnapshot: (body: CreateQuestionSnapshotPayload, params: RequestParams = {}) =>
      this.request<CreateQuestionSnapshotData, CreateQuestionSnapshotError>({
        path: `/codingInterview.createQuestionSnapshot`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Delete a coding interview question
     *
     * @tags codingInterview
     * @name DeleteQuestion
     * @summary Delete a coding interview question
     * @request DELETE:/codingInterview.deleteQuestion/{codingQuestionID}
     * @response `200` `DeleteQuestionData` Successful response with a message
     * @response `400` `HandlersErrResponse` Bad Request
     * @response `500` `HandlersErrResponse` Internal Server Error
     */
    deleteQuestion: (codingQuestionId: number, params: RequestParams = {}) =>
      this.request<DeleteQuestionData, DeleteQuestionError>({
        path: `/codingInterview.deleteQuestion/${codingQuestionId}`,
        method: "DELETE",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Get compile result for a coding interview
     *
     * @tags codingInterview
     * @name GetCompileResult
     * @summary Get compile result for a coding interview
     * @request POST:/codingInterview.getCompileResult
     * @response `200` `GetCompileResultData` Successful response with the compile result
     * @response `400` `HandlersErrResponse` Bad Request
     * @response `500` `HandlersErrResponse` Internal Server Error
     */
    getCompileResult: (body: CodingInterviewGetCompileResultQuery, params: RequestParams = {}) =>
      this.request<GetCompileResultData, GetCompileResultError>({
        path: `/codingInterview.getCompileResult`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Get coding interview question by title
     *
     * @tags codingInterview
     * @name GetQuestionByTitle
     * @summary Get coding interview question by title
     * @request GET:/codingInterview.getQuestionByTitle/{title}
     * @response `200` `GetQuestionByTitleData` Successful response with the coding interview question by title
     * @response `400` `HandlersErrResponse` Bad Request
     * @response `500` `HandlersErrResponse` Internal Server Error
     */
    getQuestionByTitle: (title: string, params: RequestParams = {}) =>
      this.request<GetQuestionByTitleData, GetQuestionByTitleError>({
        path: `/codingInterview.getQuestionByTitle/${title}`,
        method: "GET",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Get coding interview questions
     *
     * @tags codingInterview
     * @name GetQuestions
     * @summary Get coding interview questions
     * @request GET:/codingInterview.getQuestions
     * @response `200` `GetQuestionsData` Successful response with the coding interview questions
     * @response `400` `HandlersErrResponse` Bad Request
     * @response `500` `HandlersErrResponse` Internal Server Error
     */
    getQuestions: (params: RequestParams = {}) =>
      this.request<GetQuestionsData, GetQuestionsError>({
        path: `/codingInterview.getQuestions`,
        method: "GET",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Get coding interview questions in a portal
     *
     * @tags codingInterview
     * @name GetQuestionsInPortal
     * @summary Get coding interview questions in a portal
     * @request GET:/codingInterview.getQuestionsInPortal/{portalId}
     * @response `200` `GetQuestionsInPortalData` Successful response with the coding interview questions in a portal
     * @response `400` `HandlersErrResponse` Bad Request
     * @response `500` `HandlersErrResponse` Internal Server Error
     */
    getQuestionsInPortal: (portalId: number, params: RequestParams = {}) =>
      this.request<GetQuestionsInPortalData, GetQuestionsInPortalError>({
        path: `/codingInterview.getQuestionsInPortal/${portalId}`,
        method: "GET",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Get coding interview questions in a workspace
     *
     * @tags codingInterview
     * @name GetQuestionsInWorkspace
     * @summary Get coding interview questions in a workspace
     * @request GET:/codingInterview.getQuestionsInWorkspace/{workspaceId}
     * @response `200` `GetQuestionsInWorkspaceData` Successful response with the coding interview questions in a workspace
     * @response `400` `HandlersErrResponse` Bad Request
     * @response `500` `HandlersErrResponse` Internal Server Error
     */
    getQuestionsInWorkspace: (workspaceId: number, params: RequestParams = {}) =>
      this.request<GetQuestionsInWorkspaceData, GetQuestionsInWorkspaceError>({
        path: `/codingInterview.getQuestionsInWorkspace/${workspaceId}`,
        method: "GET",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Get coding interview submission result by user
     *
     * @tags codingInterview
     * @name GetSubmissionResultByUser
     * @summary Get coding interview submission result by user
     * @request POST:/codingInterview.getSubmissionResultByUser
     * @response `200` `GetSubmissionResultByUserData` Successful response with the coding interview submission result by user
     * @response `400` `HandlersErrResponse` Bad Request
     * @response `500` `HandlersErrResponse` Internal Server Error
     */
    getSubmissionResultByUser: (body: CodingInterviewGetSubmissionResultByUserQuery, params: RequestParams = {}) =>
      this.request<GetSubmissionResultByUserData, GetSubmissionResultByUserError>({
        path: `/codingInterview.getSubmissionResultByUser`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Update a coding interview question
     *
     * @tags codingInterview
     * @name UpdateQuestion
     * @summary Update a coding interview question
     * @request PUT:/codingInterview.updateQuestion/{codingQuestionID}
     * @response `200` `UpdateQuestionData` Successful response with the updated question
     * @response `400` `HandlersErrResponse` Bad Request
     * @response `500` `HandlersErrResponse` Internal Server Error
     */
    updateQuestion: (codingQuestionId: number, body: CodingInterviewUpdateQuestionQuery, params: RequestParams = {}) =>
      this.request<UpdateQuestionData, UpdateQuestionError>({
        path: `/codingInterview.updateQuestion/${codingQuestionId}`,
        method: "PUT",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Upload a coding interview video
     *
     * @tags codingInterview
     * @name UploadVideo
     * @summary Upload a coding interview video
     * @request POST:/codingInterview.uploadVideo
     * @response `200` `UploadVideoData` Successful response with a message
     * @response `400` `HandlersErrResponse` Bad Request
     * @response `500` `HandlersErrResponse` Internal Server Error
     */
    uploadVideo: (data: UploadVideoPayload, params: RequestParams = {}) =>
      this.request<UploadVideoData, UploadVideoError>({
        path: `/codingInterview.uploadVideo`,
        method: "POST",
        body: data,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),
  }
  mail = {
    /**
     * No description
     *
     * @tags mail
     * @name SendMail
     * @summary Send mail to the user
     * @request POST:/mail.sendMail
     * @response `200` `SendMailData` OK
     * @response `400` `HandlersErrResponse` Bad Request
     * @response `500` `HandlersErrResponse` Internal Server Error
     */
    sendMail: (payload: SendMailBody, params: RequestParams = {}) =>
      this.request<SendMailData, SendMailError>({
        path: `/mail.sendMail`,
        method: "POST",
        body: payload,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  }
  object = {
    /**
     * No description
     *
     * @tags object
     * @name GetObject
     * @summary Get object from the system
     * @request POST:/object.getObject
     * @response `200` `GetObjectData` OK
     * @response `400` `HandlersErrResponse` Bad Request
     * @response `500` `HandlersErrResponse` Internal Server Error
     */
    getObject: (payload: GetObjectBody, params: RequestParams = {}) =>
      this.request<GetObjectData, GetObjectError>({
        path: `/object.getObject`,
        method: "POST",
        body: payload,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags object
     * @name UploadObject
     * @summary Upload object to the system
     * @request POST:/object.uploadObject
     * @response `200` `UploadObjectData` OK
     * @response `400` `HandlersErrResponse` Bad Request
     * @response `500` `HandlersErrResponse` Internal Server Error
     */
    uploadObject: (data: UploadObjectPayload, params: RequestParams = {}) =>
      this.request<UploadObjectData, UploadObjectError>({
        path: `/object.uploadObject`,
        method: "POST",
        body: data,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),
  }
  portal = {
    /**
     * No description
     *
     * @tags portal
     * @name CreatePortal
     * @summary Create new portal
     * @request POST:/portal.create
     * @response `200` `CreatePortalData` OK
     * @response `400` `HandlersErrResponse` Bad Request
     * @response `500` `HandlersErrResponse` Internal Server Error
     */
    createPortal: (payload: CreatePortalBody, params: RequestParams = {}) =>
      this.request<CreatePortalData, CreatePortalError>({
        path: `/portal.create`,
        method: "POST",
        body: payload,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags portal
     * @name DeletePortalById
     * @summary Delete portal By Id
     * @request POST:/portal.delete
     * @response `200` `DeletePortalByIdData` OK
     * @response `400` `HandlersErrResponse` Bad Request
     * @response `500` `HandlersErrResponse` Internal Server Error
     */
    deletePortalById: (payload: DeletePortalBody, params: RequestParams = {}) =>
      this.request<DeletePortalByIdData, DeletePortalByIdError>({
        path: `/portal.delete`,
        method: "POST",
        body: payload,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags portal
     * @name GetPortalById
     * @summary Get portal
     * @request GET:/portal.get
     * @response `200` `GetPortalByIdData` OK
     * @response `400` `HandlersErrResponse` Bad Request
     * @response `500` `HandlersErrResponse` Internal Server Error
     */
    getPortalById: (query: GetPortalByIdParams, params: RequestParams = {}) =>
      this.request<GetPortalByIdData, GetPortalByIdError>({
        path: `/portal.get`,
        method: "GET",
        query: query,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  }
  room = {
    /**
     * No description
     *
     * @tags room
     * @name CreateRoom
     * @summary Create room
     * @request POST:/room.createRoom
     * @response `200` `CreateRoomData` OK
     * @response `400` `HandlersErrResponse` Bad Request
     * @response `500` `HandlersErrResponse` Internal Server Error
     */
    createRoom: (payload: CreateRoomBody, params: RequestParams = {}) =>
      this.request<CreateRoomData, CreateRoomError>({
        path: `/room.createRoom`,
        method: "POST",
        body: payload,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags room
     * @name ExtendRoomSession
     * @summary Extend room session
     * @request POST:/room.extendRoomSession
     * @response `200` `ExtendRoomSessionData` OK
     * @response `400` `HandlersErrResponse` Bad Request
     * @response `500` `HandlersErrResponse` Internal Server Error
     */
    extendRoomSession: (payload: ExtendRoomSessionBody, params: RequestParams = {}) =>
      this.request<ExtendRoomSessionData, ExtendRoomSessionError>({
        path: `/room.extendRoomSession`,
        method: "POST",
        body: payload,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags room
     * @name GetRoomContext
     * @summary Get room context
     * @request GET:/room.getRoomContext
     * @response `200` `GetRoomContextData` OK
     * @response `400` `HandlersErrResponse` Bad Request
     * @response `500` `HandlersErrResponse` Internal Server Error
     */
    getRoomContext: (query: GetRoomContextParams, params: RequestParams = {}) =>
      this.request<GetRoomContextData, GetRoomContextError>({
        path: `/room.getRoomContext`,
        method: "GET",
        query: query,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags room
     * @name GetRoomSession
     * @summary Get room session
     * @request GET:/room.getRoomSession
     * @response `200` `GetRoomSessionData` OK
     * @response `400` `HandlersErrResponse` Bad Request
     * @response `500` `HandlersErrResponse` Internal Server Error
     */
    getRoomSession: (query: GetRoomSessionParams, params: RequestParams = {}) =>
      this.request<GetRoomSessionData, GetRoomSessionError>({
        path: `/room.getRoomSession`,
        method: "GET",
        query: query,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags room
     * @name RevokeRoomSession
     * @summary Revoke room session
     * @request POST:/room.revokeRoomSession
     * @response `200` `RevokeRoomSessionData` OK
     * @response `400` `HandlersErrResponse` Bad Request
     * @response `500` `HandlersErrResponse` Internal Server Error
     */
    revokeRoomSession: (payload: RevokeRoomSessionBody, params: RequestParams = {}) =>
      this.request<RevokeRoomSessionData, RevokeRoomSessionError>({
        path: `/room.revokeRoomSession`,
        method: "POST",
        body: payload,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags room
     * @name SetRoomSession
     * @summary Set room session
     * @request POST:/room.setRoomSession
     * @response `200` `SetRoomSessionData` OK
     * @response `400` `HandlersErrResponse` Bad Request
     * @response `500` `HandlersErrResponse` Internal Server Error
     */
    setRoomSession: (payload: HandlersSetRoomSessionBody, params: RequestParams = {}) =>
      this.request<SetRoomSessionData, SetRoomSessionError>({
        path: `/room.setRoomSession`,
        method: "POST",
        body: payload,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags room
     * @name UpdateRoomContext
     * @summary Update room context
     * @request POST:/room.updateRoomContext
     * @response `200` `UpdateRoomContextData` OK
     * @response `400` `HandlersErrResponse` Bad Request
     * @response `500` `HandlersErrResponse` Internal Server Error
     */
    updateRoomContext: (payload: UpdateRoomContextBody, params: RequestParams = {}) =>
      this.request<UpdateRoomContextData, UpdateRoomContextError>({
        path: `/room.updateRoomContext`,
        method: "POST",
        body: payload,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  }
  user = {
    /**
     * No description
     *
     * @tags user
     * @name CreateAdmin
     * @summary Create new admin
     * @request POST:/user.createAdmin
     * @response `200` `CreateAdminData` OK
     * @response `400` `HandlersErrResponse` Bad Request
     * @response `500` `HandlersErrResponse` Internal Server Error
     */
    createAdmin: (payload: AdminCreateBody, params: RequestParams = {}) =>
      this.request<CreateAdminData, CreateAdminError>({
        path: `/user.createAdmin`,
        method: "POST",
        body: payload,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name CreateUser
     * @summary Create new user
     * @request POST:/user.createUser
     * @response `200` `CreateUserData` OK
     * @response `400` `HandlersErrResponse` Bad Request
     * @response `500` `HandlersErrResponse` Internal Server Error
     */
    createUser: (payload: UserCreateBody, params: RequestParams = {}) =>
      this.request<CreateUserData, CreateUserError>({
        path: `/user.createUser`,
        method: "POST",
        body: payload,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name DeleteUser
     * @summary Delete user
     * @request POST:/user.deleteUser
     * @response `200` `DeleteUserData` OK
     * @response `400` `HandlersErrResponse` Bad Request
     * @response `500` `HandlersErrResponse` Internal Server Error
     */
    deleteUser: (payload: UserDeleteBody, params: RequestParams = {}) =>
      this.request<DeleteUserData, DeleteUserError>({
        path: `/user.deleteUser`,
        method: "POST",
        body: payload,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  }
  userInWorkspace = {
    /**
     * No description
     *
     * @tags userInWorkspace
     * @name DeleteUserFromWorkspace
     * @summary Delete User From Workspace
     * @request DELETE:/userInWorkspace.delete
     * @response `200` `DeleteUserFromWorkspaceData` OK
     * @response `400` `HandlersErrResponse` Bad Request
     * @response `500` `HandlersErrResponse` Internal Server Error
     */
    deleteUserFromWorkspace: (payload: DeleteUserFromWorkspaceBody, params: RequestParams = {}) =>
      this.request<DeleteUserFromWorkspaceData, DeleteUserFromWorkspaceError>({
        path: `/userInWorkspace.delete`,
        method: "DELETE",
        body: payload,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags userInWorkspace
     * @name GetIndividualUser
     * @summary Get Individual User In Workspace
     * @request GET:/userInWorkspace.getbyId
     * @response `200` `GetIndividualUserData` OK
     * @response `400` `HandlersErrResponse` Bad Request
     * @response `500` `HandlersErrResponse` Internal Server Error
     */
    getIndividualUser: (query: GetIndividualUserParams, params: RequestParams = {}) =>
      this.request<GetIndividualUserData, GetIndividualUserError>({
        path: `/userInWorkspace.getbyId`,
        method: "GET",
        query: query,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags userInWorkspace
     * @name GetUserInWorkspace
     * @summary Get user In Workspace
     * @request GET:/userInWorkspace.get
     * @response `200` `GetUserInWorkspaceData` OK
     * @response `400` `HandlersErrResponse` Bad Request
     * @response `500` `HandlersErrResponse` Internal Server Error
     */
    getUserInWorkspace: (query: GetUserInWorkspaceParams, params: RequestParams = {}) =>
      this.request<GetUserInWorkspaceData, GetUserInWorkspaceError>({
        path: `/userInWorkspace.get`,
        method: "GET",
        query: query,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags userInWorkspace
     * @name InterestUser
     * @summary Interest User In Workspace
     * @request PATCH:/userInWorkspace.interest
     * @response `200` `InterestUserData` OK
     * @response `400` `HandlersErrResponse` Bad Request
     * @response `500` `HandlersErrResponse` Internal Server Error
     */
    interestUser: (query: InterestUserParams, params: RequestParams = {}) =>
      this.request<InterestUserData, InterestUserError>({
        path: `/userInWorkspace.interest`,
        method: "PATCH",
        query: query,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  }
  videoInterview = {
    /**
     * No description
     *
     * @tags videoInterview
     * @name GetVideoInterviewContext
     * @summary Get video interview context
     * @request GET:/videoInterview.getVideoInterviewContext
     * @response `200` `GetVideoInterviewContextData` OK
     * @response `400` `HandlersErrResponse` Bad Request
     * @response `500` `HandlersErrResponse` Internal Server Error
     */
    getVideoInterviewContext: (query: GetVideoInterviewContextParams, params: RequestParams = {}) =>
      this.request<GetVideoInterviewContextData, GetVideoInterviewContextError>({
        path: `/videoInterview.getVideoInterviewContext`,
        method: "GET",
        query: query,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags videoInterview
     * @name GetVideoInterviewQuestion
     * @summary Get video interview question
     * @request GET:/videoInterview.getVideoInterviewQuestion
     * @response `200` `GetVideoInterviewQuestionData` OK
     * @response `400` `HandlersErrResponse` Bad Request
     * @response `500` `HandlersErrResponse` Internal Server Error
     */
    getVideoInterviewQuestion: (query: GetVideoInterviewQuestionParams, params: RequestParams = {}) =>
      this.request<GetVideoInterviewQuestionData, GetVideoInterviewQuestionError>({
        path: `/videoInterview.getVideoInterviewQuestion`,
        method: "GET",
        query: query,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags videoInterview
     * @name SubmitVideoInterview
     * @summary Submit video interview
     * @request POST:/videoInterview.submitVideoInterview
     * @response `200` `SubmitVideoInterviewData` OK
     * @response `400` `HandlersErrResponse` Bad Request
     * @response `500` `HandlersErrResponse` Internal Server Error
     */
    submitVideoInterview: (data: SubmitVideoInterviewPayload, params: RequestParams = {}) =>
      this.request<SubmitVideoInterviewData, SubmitVideoInterviewError>({
        path: `/videoInterview.submitVideoInterview`,
        method: "POST",
        body: data,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),
  }
  videoQuestion = {
    /**
     * No description
     *
     * @tags videoQuestion
     * @name CreateVideoQuestion
     * @summary Create new video question
     * @request POST:/videoQuestion.createVideoQuestion
     * @response `200` `CreateVideoQuestionData` OK
     * @response `400` `HandlersErrResponse` Bad Request
     * @response `500` `HandlersErrResponse` Internal Server Error
     */
    createVideoQuestion: (payload: CreateVideoQuestionBody, params: RequestParams = {}) =>
      this.request<CreateVideoQuestionData, CreateVideoQuestionError>({
        path: `/videoQuestion.createVideoQuestion`,
        method: "POST",
        body: payload,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags videoQuestion
     * @name DeleteVideoQuestionById
     * @summary Delete video question by id
     * @request POST:/videoQuestion.deleteVideoQuestionById
     * @response `200` `DeleteVideoQuestionByIdData` OK
     * @response `400` `HandlersErrResponse` Bad Request
     * @response `404` `HandlersErrResponse` Not Found
     * @response `500` `HandlersErrResponse` Internal Server Error
     */
    deleteVideoQuestionById: (payload: DeleteVideoQuestionByIdBody, params: RequestParams = {}) =>
      this.request<DeleteVideoQuestionByIdData, DeleteVideoQuestionByIdError>({
        path: `/videoQuestion.deleteVideoQuestionById`,
        method: "POST",
        body: payload,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags videoQuestion
     * @name GetVideoQuestionById
     * @summary Get video question by id
     * @request GET:/videoQuestion.getVideoQuestionById
     * @response `200` `GetVideoQuestionByIdData` OK
     * @response `400` `HandlersErrResponse` Bad Request
     * @response `404` `HandlersErrResponse` Not Found
     * @response `500` `HandlersErrResponse` Internal Server Error
     */
    getVideoQuestionById: (query: GetVideoQuestionByIdParams, params: RequestParams = {}) =>
      this.request<GetVideoQuestionByIdData, GetVideoQuestionByIdError>({
        path: `/videoQuestion.getVideoQuestionById`,
        method: "GET",
        query: query,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags videoQuestion
     * @name GetVideoQuestionByPortalId
     * @summary Get video question by portal id
     * @request GET:/videoQuestion.getVideoQuestionByPortalId
     * @response `200` `GetVideoQuestionByPortalIdData` OK
     * @response `400` `HandlersErrResponse` Bad Request
     * @response `404` `HandlersErrResponse` Not Found
     * @response `500` `HandlersErrResponse` Internal Server Error
     */
    getVideoQuestionByPortalId: (query: GetVideoQuestionByPortalIdParams, params: RequestParams = {}) =>
      this.request<GetVideoQuestionByPortalIdData, GetVideoQuestionByPortalIdError>({
        path: `/videoQuestion.getVideoQuestionByPortalId`,
        method: "GET",
        query: query,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags videoQuestion
     * @name UpdateVideoQuestion
     * @summary Update video question
     * @request POST:/videoQuestion.updateVideoQuestion
     * @response `200` `UpdateVideoQuestionData` OK
     * @response `400` `HandlersErrResponse` Bad Request
     * @response `404` `HandlersErrResponse` Not Found
     * @response `500` `HandlersErrResponse` Internal Server Error
     */
    updateVideoQuestion: (payload: UpdateVideoQuestionBody, params: RequestParams = {}) =>
      this.request<UpdateVideoQuestionData, UpdateVideoQuestionError>({
        path: `/videoQuestion.updateVideoQuestion`,
        method: "POST",
        body: payload,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  }
  workspace = {
    /**
     * No description
     *
     * @tags workspace
     * @name CreateWorkspace
     * @summary Create new workspace
     * @request POST:/workspace.create
     * @response `200` `CreateWorkspaceData` OK
     * @response `400` `HandlersErrResponse` Bad Request
     * @response `500` `HandlersErrResponse` Internal Server Error
     */
    createWorkspace: (payload: CreateWorkspaceBody, params: RequestParams = {}) =>
      this.request<CreateWorkspaceData, CreateWorkspaceError>({
        path: `/workspace.create`,
        method: "POST",
        body: payload,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags workspace
     * @name DeleteWorkspaceById
     * @summary Delete workspace By Id
     * @request POST:/workspace.delete
     * @response `200` `DeleteWorkspaceByIdData` OK
     * @response `400` `HandlersErrResponse` Bad Request
     * @response `500` `HandlersErrResponse` Internal Server Error
     */
    deleteWorkspaceById: (payload: DeleteWorkspaceBody, params: RequestParams = {}) =>
      this.request<DeleteWorkspaceByIdData, DeleteWorkspaceByIdError>({
        path: `/workspace.delete`,
        method: "POST",
        body: payload,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags workspace
     * @name GetPortalWorkspace
     * @summary Get List of workspace
     * @request GET:/workspace.getByPortal
     * @response `200` `GetPortalWorkspaceData` OK
     * @response `400` `HandlersErrResponse` Bad Request
     * @response `500` `HandlersErrResponse` Internal Server Error
     */
    getPortalWorkspace: (params: RequestParams = {}) =>
      this.request<GetPortalWorkspaceData, GetPortalWorkspaceError>({
        path: `/workspace.getByPortal`,
        method: "GET",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags workspace
     * @name GetWorkspace
     * @summary Get workspace
     * @request GET:/workspace.get
     * @response `200` `GetWorkspaceData` OK
     * @response `400` `HandlersErrResponse` Bad Request
     * @response `500` `HandlersErrResponse` Internal Server Error
     */
    getWorkspace: (query: GetWorkspaceParams, params: RequestParams = {}) =>
      this.request<GetWorkspaceData, GetWorkspaceError>({
        path: `/workspace.get`,
        method: "GET",
        query: query,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags workspace
     * @name InviteAllCandidate
     * @request POST:/workspace.inviteAllCandidate
     * @response `200` `InviteAllCandidateData` OK
     * @response `400` `HandlersErrResponse` Bad Request
     * @response `500` `HandlersErrResponse` Internal Server Error
     */
    inviteAllCandidate: (payload: HandlersInviteAllCandidateBody, params: RequestParams = {}) =>
      this.request<InviteAllCandidateData, InviteAllCandidateError>({
        path: `/workspace.inviteAllCandidate`,
        method: "POST",
        body: payload,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  }
}
