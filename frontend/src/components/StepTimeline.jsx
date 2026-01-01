export default function StepTimeline({ steps }) {
  return (
    <ol>
      {steps.map((step, i) => (
        <li key={i}>{step}</li>
      ))}
    </ol>
  );
}
