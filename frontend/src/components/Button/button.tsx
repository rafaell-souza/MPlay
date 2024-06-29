type MyButtonProps = {
    text: string;
    style: string;
}

export default function MyButton({ text, style }: MyButtonProps) {
    return <button className={style}>{text? text: 'any Text'}</button>
}