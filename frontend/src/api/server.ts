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

export interface CodingInterviewUpdateQuestionQuery {
  body: DomainsCreateCodingQuestionRequest
  codingQuestionID: number
}

export type CreateAdminData = HandlersResponseUser

export type CreateAdminError = HandlersErrResponse

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
  dueDate: string
  isCodingDone: boolean
  isVideoDone: boolean
  totalCodingQuestion: number
  totalCodingTime: number
  totalVideoQuestion: number
  totalVideoTime: number
}

export type CreateRoomData = HandlersResponseHandlersCreateRoomResponse

export type CreateRoomError = HandlersErrResponse

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
  codingTime: number
  endDate: string
  isCoding: boolean
  isVideo: boolean
  portalId: number
  reqCamera: boolean
  reqMicrophone: boolean
  reqScreen: boolean
  startDate: string
  title: string
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

export type DeleteVideoQuestionByIdData = HandlersResponseString

export type DeleteVideoQuestionByIdError = HandlersErrResponse

export interface DeleteVideoQuestionByIdParams {
  id: number
}

export interface DeleteWorkspaceBody {
  id: number
}

export type DeleteWorkspaceByIdData = HandlersResponseString

export type DeleteWorkspaceByIdError = HandlersErrResponse

export interface DomainsCodingQuestion {
  coding_question_in_portal?: DomainsCodingQuestionInPortal[]
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
  is_submitted?: boolean
  language?: string
  linter_result?: string
  memory_usage?: string
  room_id?: string
  run_time?: string
  test_cases_result?: number
  time_taken?: number
  updatedAt?: string
}

export interface DomainsCodingQuestionTestCase {
  codingQuestionID?: number
  createdAt?: string
  deletedAt?: GormDeletedAt
  id?: number
  input?: string
  isExample?: boolean
  isHidden?: boolean
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
  test_cases?: DomainsCodingQuestionTestCase[]
  title?: string
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

export type GetCompileResultData = HandlersResponseHandlersCodingInterviewGetCompileResultResponse

export type GetCompileResultError = HandlersErrResponse

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

export type GetRoomContextData = HandlersResponseGetRoomContextResponse

export type GetRoomContextError = HandlersErrResponse

export interface GetRoomContextParams {
  roomId: string
}

export interface GetRoomContextResponse {
  candidateId: number
  dueDate: string
  isCodingDone: boolean
  isVideoDone: boolean
  roomId: string
  totalCodingQuestion: number
  totalCodingTime: number
  totalVideoQuestion: number
  totalVideoTime: number
}

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

export interface HandlersCreateRoomResponse {
  candidateId: number
  dueDate: string
  isCodingDone: boolean
  isVideoDone: boolean
  roomId: string
  totalCodingQuestion: number
  totalCodingTime: number
  totalVideoQuestion: number
  totalVideoTime: number
}

export interface HandlersErrResponse {
  code?: number
  message?: string
  timestamp?: string
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

export interface HandlersResponseHandlersCodingInterviewGetQuestionsResponse {
  code?: number
  data?: DomainsCodingQuestionResponse[]
  message?: string
  timestamp?: string
}

export interface HandlersResponseHandlersCreateRoomResponse {
  code?: number
  data?: HandlersCreateRoomResponse
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

export interface IndividualUser {
  id: number
  userData: User
  userInWorkspace: UserInWorkspace
}

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

export interface SendMailBody {
  mailList: MailObject[]
  preset: HandlersMailPreset
}

export type SendMailData = HandlersResponseString

export type SendMailError = HandlersErrResponse

export type SubmitVideoInterviewData = HandlersResponseString

export type SubmitVideoInterviewError = HandlersErrResponse

export interface SubmitVideoInterviewPayload {
  /**
   * Video Interview File
   * @format binary
   */
  file: File
}

export type UpdateQuestionData = HandlersResponseDomainsCodingQuestion

export type UpdateQuestionError = HandlersErrResponse

export interface UpdateRoomContextBody {
  candidateId?: number
  dueDate?: string
  isCodingDone?: boolean
  isVideoDone?: boolean
  roomId: string
  totalCodingQuestion?: number
  totalCodingTime?: number
  totalVideoQuestion?: number
  totalVideoTime?: number
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

export interface WorkspaceData {
  individualUser: IndividualUser[]
  workspaceDetail: WorkspaceDetail
}

export interface WorkspaceDetail {
  codingTime?: number
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
    export type RequestQuery = {
      id: number
    }
    export type RequestBody = never
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
    deleteVideoQuestionById: (query: DeleteVideoQuestionByIdParams, params: RequestParams = {}) =>
      this.request<DeleteVideoQuestionByIdData, DeleteVideoQuestionByIdError>({
        path: `/videoQuestion.deleteVideoQuestionById`,
        method: "POST",
        query: query,
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
  }
}
