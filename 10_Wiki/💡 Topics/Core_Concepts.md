id: 8a3b2c4d-5e7f-8c2a-3f1b5e7a9b0d
category: "💡 Topics"
confidence_score: 0.98
tags: ["Self-Attention", "Tokenization", "NLP_Theory"]
last_reinforced: 2026-04-24
---
# 핵심 기술 개념: 셀프 어텐션과 토큰화

## 📌 한 줄 통찰
> 문맥 파악의 핵심인 '셀프 어텐션'과 모델이 이해할 수 있는 숫자 형태인 '토큰화'는 트랜스포머의 작동 원리를 이해하는 데 필수적입니다.

## 📖 구조화된 지식
- **셀프 어텐션 (Self-Attention)**: 문장 내 각 단어 간의 관계를 계산하여 문맥을 파악합니다.
    - 핵심 공식: $Attention(Q, K, V) = softmax(\frac{QK^T}{\sqrt{d_k}})V$
- **토큰화 (Tokenization)**: 텍스트를 모델이 이해할 수 있는 숫자 형태로 변환하는 과정입니다.
    - 방식: 서브워드(Subword) 토큰화를 사용하여 신조어 등에 대응 능력을 높입니다.

## 🔗 지식 연결
- Parent: [[10_Wiki/💡 Topics/Transformer_Overview]]
- Related: ["NLP_Theory", "Attention Mechanism"]
- Raw Source: [[00_Raw/2026-04-24/day1.md]]