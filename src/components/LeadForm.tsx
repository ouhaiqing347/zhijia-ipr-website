"use client";

import { FormEvent, useState } from "react";
import { Send } from "lucide-react";
import { formServiceOptions, phoneHref, phoneNumber } from "@/data/site";

type LeadFormProps = {
  source: string;
  compact?: boolean;
};

type SubmitState = "idle" | "submitting" | "success" | "error";

export function LeadForm({ source, compact = false }: LeadFormProps) {
  const [state, setState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") || "").trim(),
      phone: String(formData.get("phone") || "").trim(),
      serviceType: String(formData.get("serviceType") || "").trim(),
      region: String(formData.get("region") || "").trim(),
      message: String(formData.get("message") || "").trim(),
      source
    };

    if (!payload.name || !payload.phone || !payload.serviceType) {
      setState("error");
      setMessage("请填写姓名/公司、联系电话和服务类型。");
      return;
    }

    setState("success");
    setMessage(`信息已整理，请直接拨打 ${phoneNumber} 与顾问确认。`);
  }

  return (
    <form className={compact ? "lead-form compact" : "lead-form"} onSubmit={onSubmit}>
      <div className="form-grid">
        <label>
          <span>姓名 / 公司</span>
          <input name="name" placeholder="例如：王先生 / 某某科技" />
        </label>
        <label>
          <span>联系电话</span>
          <input name="phone" placeholder="请输入手机号" inputMode="tel" />
        </label>
      </div>

      <div className="form-grid">
        <label>
          <span>服务类型</span>
          <select name="serviceType" defaultValue="">
            <option value="" disabled>
              请选择服务类型
            </option>
            {formServiceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>国家 / 地区</span>
          <input name="region" placeholder="例如：美国、欧盟、日本、ODI" />
        </label>
      </div>

      <label>
        <span>需求说明</span>
        <textarea name="message" rows={compact ? 3 : 4} placeholder="简单描述当前业务、目标市场或材料情况" />
      </label>

      <button className="primary-button form-button" disabled={state === "submitting"} type="submit">
        <Send size={17} />
        {state === "submitting" ? "提交中" : "提交咨询"}
      </button>

      <a className="form-phone-link" href={phoneHref}>
        电话咨询 {phoneNumber}
      </a>

      {message ? <p className={`form-message ${state}`}>{message}</p> : null}
    </form>
  );
}
