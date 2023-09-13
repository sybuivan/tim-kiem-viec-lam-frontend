import jwt_decode from 'jwt-decode';

import { ROLE_COMPANY, ROLE_USER, ROLE_ADMIN } from 'src/constants/common';

import { IApply } from 'src/types/apply';
import { IJob } from 'src/types/job';

export const messageRequired = (key: string) => {
  return `${key} không được bỏ trống`;
};

export const messageMail = (
  status: number | string | any,
  name_job: string,
  fullName: string,
  phone: string,
  name_company: string,
  address?: string,
  date?: any,
  hour?: any
) => {
  if (status === 2)
    return `
  <p style="text-align: start">Chào ${fullName}</p>

  <p style="text-align: start">Tôi hy vọng bạn đang có một ngày tốt lành. Tôi viết email này để thông báo rằng chúng tôi đã xem xét kỹ hồ sơ của bạn cho vị trí <b>${name_job}</b> tại <b>${name_company}</b> và rất ấn tượng với kinh nghiệm và kỹ năng mà bạn đã tích luỹ.</p>

  <p style="text-align: start">Tôi muốn mời bạn tham gia cuộc phỏng vấn với chúng tôi để có cơ hội trao đổi thêm về kỹ năng, kinh nghiệm và sự phù hợp với công việc. Cuộc phỏng vấn sẽ diễn ra vào ngày <b>${
    date ? date : `[ngày]`
  }</b> và thời gian <b>${
      hour ? hour : `[giờ]`
    }</b> tại văn phòng của chúng tôi tại <b>
  ${address} </b>
  .</p>

  <p style="text-align: start">Vui lòng xác nhận lại sự tham gia của bạn bằng cách trả lời email này trước ngày [ngày xác nhận]. Nếu bạn không thể tham gia vào thời điểm này, xin vui lòng cho chúng tôi biết để chúng tôi có thể sắp xếp lại lịch phỏng vấn phù hợp.</p>

  <p style="text-align: start">Trong cuộc phỏng vấn, chúng tôi sẽ thảo luận chi tiết về vai trò, công việc và các yêu cầu cụ thể. Đồng thời, đây cũng là cơ hội cho bạn để tìm hiểu thêm về công ty và môi trường làm việc.</p>

  <p style="text-align: start">Nếu bạn cần thêm thông tin hoặc có bất kỳ câu hỏi nào trước cuộc phỏng vấn, xin vui lòng liên hệ với tôi qua email này hoặc số điện thoại <b>${phone}</b>. Tôi sẽ sẵn lòng giúp bạn.</p>

  <p style="text-align: start">Chúng tôi rất mong được gặp bạn trong cuộc phỏng vấn và chúc bạn mọi điều tốt lành cho giai đoạn tiếp theo của quá trình tuyển dụng.</p>

  <p style="text-align: start">Trân trọng,
  </p> Liên hệ: ${phone} </p>
  <p>${name_company} </p>
  `;
  if (status === 1)
    return `
  <p style="text-align: start">Chào ${fullName}</p>

  <p style="text-align: start">Tôi hy vọng bạn đang có một ngày tuyệt vời. Tôi viết email này để gửi lời cảm ơn chân thành từ ${name_company} đối với hồ sơ ứng tuyển mà bạn đã gửi cho chúng tôi.</p>

  <p style="text-align: start">Tôi muốn cho bạn biết rằng chúng tôi đã xem qua CV của bạn và rất ấn tượng với kinh nghiệm và kỹ năng mà bạn đã tích luỹ trong lĩnh vực. Chúng tôi đánh giá cao sự quan tâm và sự đầu tư mà bạn đã đặt vào quá trình nộp đơn.</p>

  <p style="text-align: start">Hiện tại, chúng tôi đang tiến hành quá trình xem xét và phân tích hồ sơ của tất cả các ứng viên tiềm năng cho vị trí <b>${name_job}</b>. Điều này có thể mất một thời gian nhất định, vì vậy tôi xin lỗi vì bất kỳ sự chậm trễ nào trong việc trả lời của chúng tôi. Tuy nhiên, tôi cam đoan rằng bạn sẽ nhận được phản hồi từ chúng tôi trong khoảng thời gian ngắn.</p>


  <p style="text-align: start">Trong khi chờ đợi, nếu bạn có bất kỳ câu hỏi hoặc cần thêm thông tin, xin vui lòng liên hệ với tôi qua email này hoặc số điện thoại ${phone}. Tôi sẽ rất vui lòng trả lời mọi câu hỏi mà bạn có thể có.</p>

  <p style="text-align: start">Một lần nữa, tôi muốn cảm ơn bạn vì đã quan tâm đến cơ hội làm việc tại ${name_company}. Chúng tôi đánh giá cao những nỗ lực mà bạn đã bỏ ra và hy vọng có cơ hội để tiếp tục gặp gỡ và thảo luận chi tiết về khả năng hợp tác trong tương lai gần.</p>

  <p style="text-align: start">Chúc bạn một ngày tốt lành!</p>

  <p style="text-align: start">Trân trọng,
  </p>
  </p> Liên hệ: ${phone} </p>
  <p>${name_company} </p>
   `;
  if (status === 4)
    return `<p style="text-align: start">Chào ${fullName},</p>

  <p style="text-align: start">Tôi hy vọng bạn đang có một ngày tốt lành. Tôi viết email này để thông báo rằng sau khi xem xét kỹ hồ sơ và thảo luận nội bộ, chúng tôi đã quyết định không tiến tới giai đoạn tiếp theo trong quá trình tuyển dụng cho vị trí <b>${name_job}</b> tại <b>${name_company}</b>.</p>
  
  <p style="text-align: start">Chúng tôi đã đánh giá cao kinh nghiệm và nỗ lực mà bạn đã đưa ra trong hồ sơ ứng tuyển. Tuy nhiên, sau khi xem xét kỹ lưỡng và so sánh với những ứng viên khác, chúng tôi phải đưa ra quyết định khó khăn và lựa chọn những ứng viên phù hợp nhất với yêu cầu và tiêu chí của chúng tôi.</p>
  
  <p style="text-align: start">Đây không phải là một quyết định dễ dàng và chúng tôi đánh giá cao sự quan tâm của bạn đối với công ty chúng tôi. Chúng tôi khuyến khích bạn tiếp tục tìm kiếm cơ hội tương tự và chúc bạn thành công trong sự nghiệp của mình.</p>
  
  <p style="text-align: start">Một lần nữa, tôi xin chân thành cảm ơn bạn đã quan tâm và gửi hồ sơ đến chúng tôi. Chúc bạn mọi điều tốt lành trong tương lai.</p>
  
  <p style="text-align: start">Trân trọng,</p>
  
  </p> Liên hệ: ${phone} </p>
  <p>${name_company} </p>
  `;
  else
    return `<p style="text-align: start">Chào ${fullName},</p>

    <p style="text-align: start">Tôi hy vọng bạn đang có một ngày tốt lành. Tôi viết email này để mời bạn tham gia bài test trong quá trình tuyển dụng của chúng tôi.</p>
    
    <p style="text-align: start">Chúng tôi đã xem xét kỹ lưỡng hồ sơ của bạn và rất ấn tượng với kinh nghiệm và kỹ năng mà bạn đã trình bày. Vì vậy, chúng tôi muốn mời bạn tham gia bài test để tiếp tục đánh giá khả năng của bạn.</p>
    
    <p style="text-align: start">Thông tin về bài test:
    Tên bài test: [Tên bài test]
    Ngày và thời gian: [Ngày và thời gian]
    Địa điểm: [Địa điểm (nếu cần thiết)]
    Thời lượng dự kiến: [Thời lượng dự kiến]</p>
    
    <p style="text-align: start">Bài test này được thiết kế để đánh giá các kỹ năng và kiến thức liên quan đến vị trí công việc mà bạn đã ứng tuyển. Chúng tôi tin rằng bài test sẽ cung cấp cho chúng tôi cái nhìn sâu hơn về khả năng của bạn và giúp chúng tôi đưa ra quyết định tuyển dụng tốt nhất.</p>
    
    <p style="text-align: start">Chúng tôi rất mong được gặp bạn trong bài test và hy vọng rằng đây sẽ là bước tiến quan trọng trên con đường tuyển dụng của chúng tôi. Chúc bạn có một ngày tuyệt vời và chúng tôi mong sớm nhận được phản hồi từ bạn.</p>
    
    <p style="text-align: start">Trân trọng,</p>
    </p> Liên hệ: ${phone} </p>
    <p>${name_company} </p>
    `;
};

export const checkIsSaveJob = (savedList: IJob[], id_job: string) => {
  return savedList.findIndex((job) => job.id_job === id_job) >= 0
    ? true
    : false;
};

export const checkIsApply = (applyList: IApply[], id_job: string) => {
  return applyList.findIndex((apply) => apply.id_job === id_job) >= 0
    ? true
    : false;
};

export const checkIsFollow = (
  followere: { id_user: string }[],
  id_user: string
) => {
  return followere.findIndex((item) => item.id_user === id_user) >= 0
    ? true
    : false;
};

export const checkRoleCompany = (idRole: string, token: string) => {
  if (idRole === ROLE_COMPANY && token) return true;

  return false;
};
export const checkRoleAdmin = (idRole: string, token: string) => {
  if (idRole === ROLE_ADMIN && token) return true;

  return false;
};

export const checkRoleUser = (idRole: string, token: string) => {
  if (idRole === ROLE_USER && token) return true;
  return false;
};

export const isAccessTokenExpired = (accessToken: string) => {
  if (!accessToken) {
    return true;
  }

  try {
    const decodedToken: any = jwt_decode(accessToken);
    const currentTime = Math.floor(Date.now() / 1000);
    console.log({ decodedToken });
    if (decodedToken.exp < currentTime) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error('Lỗi khi giải mã access token:', error);
    return true;
  }
};
