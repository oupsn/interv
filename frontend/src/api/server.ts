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

export interface AdminCreateBody {
  portalId: number
  user: DomainsUser
}

export interface CodingInterviewCreateQuestionQuery {
  body: DomainsCreateCodingQuestionRequest
}

export interface CodingInterviewGenerateCompileTokenQuery {
  body: DomainsCompilationRequest
}

export interface CodingInterviewGenerateCompileTokenResponse {
  token?: string
}

export interface CodingInterviewGetCompileResultResponse {
  compileResult?: DomainsCompilationResultResponse
}

export interface CodingInterviewGetQuestionsResponse {
  questions?: DomainsCodingQuestionResponse[]
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

export type CreateUserData = HandlersResponseUser

export type CreateUserError = HandlersErrResponse

export interface CreateVideoQuestionBody {
  retryAmount: number
  timeToAnswer: number
  timeToPrepare: number
  title: string
  workspaceId: number
}

export type CreateVideoQuestionData = HandlersResponseCreateVideoQuestionResponse

export type CreateVideoQuestionError = HandlersErrResponse

export interface CreateVideoQuestionResponse {
  createdAt?: string
  id?: number
  retryAmount?: number
  timeToAnswer?: number
  timeToPrepare?: number
  title?: string
  updatedAt?: string
  workspaceId?: number
}

export interface CreateWorkspaceBody {
  isCoding: boolean
  isVideo: boolean
  startDate: string
  stopDate: string
  title: string
}

export type CreateWorkspaceData = HandlersResponseWorkspaceDetail

export type CreateWorkspaceError = HandlersErrResponse

export interface CurrentUserResponse {
  created_at: string
  id: number
  role: string
  updated_at: string
  username: string
}

export interface DeletePortalBody {
  id: number
}

export type DeletePortalByIdData = HandlersResponseString

export type DeletePortalByIdError = HandlersErrResponse

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
  createdAt?: string
  createdBy?: string
  deletedAt?: GormDeletedAt
  description?: string
  examples?: DomainsCodingQuestionExample[]
  id?: number
  tags?: string[]
  testCases?: DomainsCodingQuestionTestCase[]
  title?: string
  updatedAt?: string
  updatedBy?: string
}

export interface DomainsCodingQuestionExample {
  codingQuestionID?: number
  createdAt?: string
  deletedAt?: GormDeletedAt
  id?: number
  input?: string
  output?: string
  updatedAt?: string
}

export interface DomainsCodingQuestionResponse {
  description?: string
  example_input?: string
  example_output?: string
  id?: number
  test_case?: DomainsCodingQuestionTestCase[]
  title?: string
}

export interface DomainsCodingQuestionTestCase {
  codingQuestionID?: number
  createdAt?: string
  deletedAt?: GormDeletedAt
  id?: number
  input?: string
  isHidden?: boolean
  output?: string
  updatedAt?: string
}

export interface DomainsCompilationRequest {
  input?: string
  language?: number
  source_code?: string
}

export interface DomainsCompilationResultResponse {
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
  token?: string
}

export interface DomainsCreateCodingQuestionRequest {
  description?: string
  difficulty?: string
  examples?: DomainsCodingQuestionExample[]
  tags?: string[]
  test_cases?: DomainsCodingQuestionTestCase[]
  title?: string
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

export type GenerateCompileTokenData = HandlersResponseCodingInterviewGenerateCompileTokenResponse

export type GenerateCompileTokenError = HandlersErrResponse

export type GetAllWorkspaceData = HandlersResponseArrayWorkspaceDetail

export type GetAllWorkspaceError = HandlersErrResponse

export type GetCompileResultData = HandlersResponseCodingInterviewGetCompileResultResponse

export type GetCompileResultError = HandlersErrResponse

export type GetLobbyContextData = HandlersResponseGetLobbyContextResponse

export type GetLobbyContextError = HandlersErrResponse

export interface GetLobbyContextParams {
  lobbyId: number
}

export interface GetLobbyContextResponse {
  dueDate: string
  isCodingDone: boolean
  isVideoDone: boolean
  lobbyId: number
  totalCodingQuestion: number
  totalCodingTime: number
  totalVideoQuestion: number
  totalVideoTime: number
  userId: number
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

export type GetQuestionsData = HandlersResponseCodingInterviewGetQuestionsResponse

export type GetQuestionsError = HandlersErrResponse

export type GetUserInWorkspaceData = HandlersResponseArrayUserInWorkspace

export type GetUserInWorkspaceError = HandlersErrResponse

export interface GetUserInWorkspaceParams {
  id: number
}

export type GetVideoInterviewContextData = HandlersResponseVideoInterviewContextResponse

export type GetVideoInterviewContextError = HandlersErrResponse

export interface GetVideoInterviewContextParams {
  lobbyId: number
}

export type GetVideoInterviewQuestionData = HandlersResponseVideoInterviewQuestionResponse

export type GetVideoInterviewQuestionError = HandlersErrResponse

export interface GetVideoInterviewQuestionParams {
  questionId: number
}

export type GetVideoQuestionByIdData = HandlersResponseGetVideoQuestionByIdResponse

export type GetVideoQuestionByIdError = HandlersErrResponse

export interface GetVideoQuestionByIdParams {
  id: string
}

export interface GetVideoQuestionByIdResponse {
  createdAt?: string
  id?: number
  retryAmount?: number
  timeToAnswer?: number
  timeToPrepare?: number
  title?: string
  updatedAt?: string
  workspaceId?: number
}

export type GetVideoQuestionByWorkspaceIdData = HandlersResponseArrayGetVideoQuestionByIdResponse[]

export type GetVideoQuestionByWorkspaceIdError = HandlersErrResponse

export interface GetVideoQuestionByWorkspaceIdParams {
  id: string
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

export interface HandlersResponseArrayGetVideoQuestionByIdResponse {
  code?: number
  data?: GetVideoQuestionByIdResponse[]
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

export interface HandlersResponseCodingInterviewGenerateCompileTokenResponse {
  code?: number
  data?: CodingInterviewGenerateCompileTokenResponse
  message?: string
  timestamp?: string
}

export interface HandlersResponseCodingInterviewGetCompileResultResponse {
  code?: number
  data?: CodingInterviewGetCompileResultResponse
  message?: string
  timestamp?: string
}

export interface HandlersResponseCodingInterviewGetQuestionsResponse {
  code?: number
  data?: CodingInterviewGetQuestionsResponse
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

export interface HandlersResponseGetLobbyContextResponse {
  code?: number
  data?: GetLobbyContextResponse
  message?: string
  timestamp?: string
}

export interface HandlersResponseGetVideoQuestionByIdResponse {
  code?: number
  data?: GetVideoQuestionByIdResponse
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
  link?: string
  name: string
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

export interface UpdateLobbyContextBody {
  dueDate?: string
  isCodingDone?: boolean
  isVideoDone?: boolean
  lobbyId: number
  totalCodingQuestion?: number
  totalCodingTime?: number
  totalVideoQuestion?: number
  totalVideoTime?: number
  userId?: number
}

export type UpdateLobbyContextData = HandlersResponseString

export type UpdateLobbyContextError = HandlersErrResponse

export interface UpdateVideoQuestionBody {
  id: number
  retryAmount?: number
  timeToAnswer?: number
  timeToPrepare?: number
  title?: string
  workspaceId?: number
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
  retry: number
  timeToAnswer: number
  timeToPrepare: number
}

export interface WorkspaceData {
  individualUser: IndividualUser[]
  workspaceDetail: WorkspaceDetail
}

export interface WorkspaceDetail {
  id?: number
  isCoding?: boolean
  isVideo?: boolean
  memberNum?: number
  startDate?: string
  stopDate?: string
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
   * @description Generate compile token for a coding interview
   * @tags codingInterview
   * @name GenerateCompileToken
   * @summary Generate compile token for a coding interview
   * @request POST:/codingInterview.generateCompileToken
   * @response `200` `GenerateCompileTokenData` Successful response with the compile token
   * @response `400` `HandlersErrResponse` Bad Request
   * @response `500` `HandlersErrResponse` Internal Server Error
   */
  export namespace GenerateCompileToken {
    export type RequestParams = {}
    export type RequestQuery = {}
    export type RequestBody = CodingInterviewGenerateCompileTokenQuery
    export type RequestHeaders = {}
    export type ResponseBody = GenerateCompileTokenData
  }

  /**
   * @description Get compile result for a coding interview
   * @tags codingInterview
   * @name GetCompileResult
   * @summary Get compile result for a coding interview
   * @request GET:/codingInterview.getCompileResult/{token}
   * @response `200` `GetCompileResultData` Successful response with the compile result
   * @response `400` `HandlersErrResponse` Bad Request
   * @response `500` `HandlersErrResponse` Internal Server Error
   */
  export namespace GetCompileResult {
    export type RequestParams = {
      /** Token to get the compile result */
      token: string
    }
    export type RequestQuery = {}
    export type RequestBody = never
    export type RequestHeaders = {}
    export type ResponseBody = GetCompileResultData
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
}

export namespace Lobby {
  /**
   * No description
   * @tags lobby
   * @name GetLobbyContext
   * @summary Get lobby context
   * @request GET:/lobby.getLobbyContext
   * @response `200` `GetLobbyContextData` OK
   * @response `400` `HandlersErrResponse` Bad Request
   * @response `500` `HandlersErrResponse` Internal Server Error
   */
  export namespace GetLobbyContext {
    export type RequestParams = {}
    export type RequestQuery = {
      lobbyId: number
    }
    export type RequestBody = never
    export type RequestHeaders = {}
    export type ResponseBody = GetLobbyContextData
  }

  /**
   * No description
   * @tags lobby
   * @name UpdateLobbyContext
   * @summary Update lobby context
   * @request POST:/lobby.updateLobbyContext
   * @response `200` `UpdateLobbyContextData` OK
   * @response `400` `HandlersErrResponse` Bad Request
   * @response `500` `HandlersErrResponse` Internal Server Error
   */
  export namespace UpdateLobbyContext {
    export type RequestParams = {}
    export type RequestQuery = {}
    export type RequestBody = UpdateLobbyContextBody
    export type RequestHeaders = {}
    export type ResponseBody = UpdateLobbyContextData
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
      lobbyId: number
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
   * @request GET:/videoQuestion.getVideoQuestionById/{id}
   * @response `200` `GetVideoQuestionByIdData` OK
   * @response `400` `HandlersErrResponse` Bad Request
   * @response `404` `HandlersErrResponse` Not Found
   * @response `500` `HandlersErrResponse` Internal Server Error
   */
  export namespace GetVideoQuestionById {
    export type RequestParams = {
      id: string
    }
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
   * @name GetVideoQuestionByWorkspaceId
   * @summary Get video question by workspace id
   * @request GET:/videoQuestion.getVideoQuestionWorkspaceIdId/{id}
   * @response `200` `GetVideoQuestionByWorkspaceIdData` OK
   * @response `400` `HandlersErrResponse` Bad Request
   * @response `404` `HandlersErrResponse` Not Found
   * @response `500` `HandlersErrResponse` Internal Server Error
   */
  export namespace GetVideoQuestionByWorkspaceId {
    export type RequestParams = {
      id: string
    }
    export type RequestQuery = {
      id: number
    }
    export type RequestBody = never
    export type RequestHeaders = {}
    export type ResponseBody = GetVideoQuestionByWorkspaceIdData
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
   * @name GetAllWorkspace
   * @summary Get List of workspace
   * @request GET:/workspace.getAll
   * @response `200` `GetAllWorkspaceData` OK
   * @response `400` `HandlersErrResponse` Bad Request
   * @response `500` `HandlersErrResponse` Internal Server Error
   */
  export namespace GetAllWorkspace {
    export type RequestParams = {}
    export type RequestQuery = {}
    export type RequestBody = never
    export type RequestHeaders = {}
    export type ResponseBody = GetAllWorkspaceData
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
     * @description Generate compile token for a coding interview
     *
     * @tags codingInterview
     * @name GenerateCompileToken
     * @summary Generate compile token for a coding interview
     * @request POST:/codingInterview.generateCompileToken
     * @response `200` `GenerateCompileTokenData` Successful response with the compile token
     * @response `400` `HandlersErrResponse` Bad Request
     * @response `500` `HandlersErrResponse` Internal Server Error
     */
    generateCompileToken: (body: CodingInterviewGenerateCompileTokenQuery, params: RequestParams = {}) =>
      this.request<GenerateCompileTokenData, GenerateCompileTokenError>({
        path: `/codingInterview.generateCompileToken`,
        method: "POST",
        body: body,
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
     * @request GET:/codingInterview.getCompileResult/{token}
     * @response `200` `GetCompileResultData` Successful response with the compile result
     * @response `400` `HandlersErrResponse` Bad Request
     * @response `500` `HandlersErrResponse` Internal Server Error
     */
    getCompileResult: (token: string, params: RequestParams = {}) =>
      this.request<GetCompileResultData, GetCompileResultError>({
        path: `/codingInterview.getCompileResult/${token}`,
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
  }
  lobby = {
    /**
     * No description
     *
     * @tags lobby
     * @name GetLobbyContext
     * @summary Get lobby context
     * @request GET:/lobby.getLobbyContext
     * @response `200` `GetLobbyContextData` OK
     * @response `400` `HandlersErrResponse` Bad Request
     * @response `500` `HandlersErrResponse` Internal Server Error
     */
    getLobbyContext: (query: GetLobbyContextParams, params: RequestParams = {}) =>
      this.request<GetLobbyContextData, GetLobbyContextError>({
        path: `/lobby.getLobbyContext`,
        method: "GET",
        query: query,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags lobby
     * @name UpdateLobbyContext
     * @summary Update lobby context
     * @request POST:/lobby.updateLobbyContext
     * @response `200` `UpdateLobbyContextData` OK
     * @response `400` `HandlersErrResponse` Bad Request
     * @response `500` `HandlersErrResponse` Internal Server Error
     */
    updateLobbyContext: (payload: UpdateLobbyContextBody, params: RequestParams = {}) =>
      this.request<UpdateLobbyContextData, UpdateLobbyContextError>({
        path: `/lobby.updateLobbyContext`,
        method: "POST",
        body: payload,
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
     * @request GET:/videoQuestion.getVideoQuestionById/{id}
     * @response `200` `GetVideoQuestionByIdData` OK
     * @response `400` `HandlersErrResponse` Bad Request
     * @response `404` `HandlersErrResponse` Not Found
     * @response `500` `HandlersErrResponse` Internal Server Error
     */
    getVideoQuestionById: ({ id, ...query }: GetVideoQuestionByIdParams, params: RequestParams = {}) =>
      this.request<GetVideoQuestionByIdData, GetVideoQuestionByIdError>({
        path: `/videoQuestion.getVideoQuestionById/${id}`,
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
     * @name GetVideoQuestionByWorkspaceId
     * @summary Get video question by workspace id
     * @request GET:/videoQuestion.getVideoQuestionWorkspaceIdId/{id}
     * @response `200` `GetVideoQuestionByWorkspaceIdData` OK
     * @response `400` `HandlersErrResponse` Bad Request
     * @response `404` `HandlersErrResponse` Not Found
     * @response `500` `HandlersErrResponse` Internal Server Error
     */
    getVideoQuestionByWorkspaceId: (
      { id, ...query }: GetVideoQuestionByWorkspaceIdParams,
      params: RequestParams = {},
    ) =>
      this.request<GetVideoQuestionByWorkspaceIdData, GetVideoQuestionByWorkspaceIdError>({
        path: `/videoQuestion.getVideoQuestionWorkspaceIdId/${id}`,
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
     * @name GetAllWorkspace
     * @summary Get List of workspace
     * @request GET:/workspace.getAll
     * @response `200` `GetAllWorkspaceData` OK
     * @response `400` `HandlersErrResponse` Bad Request
     * @response `500` `HandlersErrResponse` Internal Server Error
     */
    getAllWorkspace: (params: RequestParams = {}) =>
      this.request<GetAllWorkspaceData, GetAllWorkspaceError>({
        path: `/workspace.getAll`,
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
